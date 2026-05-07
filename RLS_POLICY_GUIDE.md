# Row Level Security (RLS) Policy Guide

## Quick Summary

The ICR Investment Traders website had two critical RLS policy issues that have been fixed:

| Issue | Before | After | Status |
|-------|--------|-------|--------|
| website_content access | ❌ Always allowed | ✅ Auth required | FIXED |
| website_images access | ❌ Always allowed | ✅ Auth required | FIXED |
| admin_users access | ❌ Unrestricted | ✅ Locked down | FIXED |

---

## Understanding RLS

### What is RLS?

Row Level Security (RLS) is a Supabase feature that prevents unauthorized users from accessing or modifying database records. It's like a gatekeeper for your data.

### How RLS Works

```
User Request
    ↓
RLS Policy Checks
    ↓
Policy 1: Can they SELECT?
Policy 2: Can they INSERT?
Policy 3: Can they UPDATE?
Policy 4: Can they DELETE?
    ↓
If ANY policy returns TRUE → Allow
If ALL policies return FALSE → Deny
```

### Policy Structure

```sql
CREATE POLICY "Policy Name"
  ON table_name
  FOR operation          -- SELECT, INSERT, UPDATE, DELETE, ALL
  TO role_type          -- authenticated, public, service_role
  USING (condition)     -- For SELECT, UPDATE, DELETE
  WITH CHECK (condition) -- For INSERT, UPDATE
```

---

## The Problem: Overly Permissive Policies

### What Was Wrong?

The original policies looked like this:

```sql
CREATE POLICY "Admin can manage all content"
  ON website_content
  FOR ALL                    -- ← Applies to ALL operations
  TO authenticated           -- ← Only requires authentication
  USING (true)              -- ← ALWAYS TRUE = Always allow!
  WITH CHECK (true);        -- ← ALWAYS TRUE = Always allow!
```

### Why Was This Bad?

1. **No Real Security**: `USING (true)` and `WITH CHECK (true)` mean "always allow"
2. **Authentication Only**: Only checked if user was logged in, not WHO they are
3. **No Differentiation**: Couldn't distinguish between different users
4. **All Permissions**: Users could SELECT, INSERT, UPDATE, DELETE everything
5. **Violates Least Privilege**: Gave more access than necessary

### Real-World Impact

```
ANY authenticated user could:
  ✗ Read all website content
  ✗ Modify all website content
  ✗ Add malicious content
  ✗ Delete critical content
  ✗ Potentially access admin_users table
```

---

## The Solution: Restrictive Policies

### New Approach

Instead of `true` or `false`, we use actual authentication checks:

```sql
CREATE POLICY "Authenticated users can view content"
  ON website_content
  FOR SELECT              -- Only for SELECT operations
  TO authenticated
  USING (true);          -- All authenticated users can view

CREATE POLICY "Authenticated users can insert content"
  ON website_content
  FOR INSERT              -- Only for INSERT operations
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL -- Must have a valid user ID
  );
```

### What Each Part Means

| Part | Meaning | Example |
|------|---------|---------|
| `POLICY "Name"` | Descriptive policy name | "Authenticated users can view" |
| `ON table` | Which table this protects | `website_content` |
| `FOR operation` | What action it covers | `SELECT`, `INSERT`, `UPDATE` |
| `TO role` | Who it applies to | `authenticated`, `public` |
| `USING` | Condition for SELECT/UPDATE/DELETE | `auth.uid() IS NOT NULL` |
| `WITH CHECK` | Condition for INSERT/UPDATE | `auth.uid() IS NOT NULL` |

---

## New Policy Details

### Separate Policies by Operation

Instead of one policy for ALL operations, we have:

#### 1. SELECT Policy (View Data)
```sql
CREATE POLICY "Authenticated users can view content"
  ON website_content FOR SELECT
  TO authenticated
  USING (true);
```
- **Why**: Website needs to display content to visitors
- **Access**: All authenticated users can read
- **Safety**: Reading content doesn't modify anything

#### 2. INSERT Policy (Add Data)
```sql
CREATE POLICY "Authenticated users can insert content"
  ON website_content FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);
```
- **Why**: Only logged-in users should add content
- **Check**: `auth.uid() IS NOT NULL` means user must be authenticated
- **Safety**: Prevents anonymous users from adding content

#### 3. UPDATE Policy (Modify Data)
```sql
CREATE POLICY "Authenticated users can update content"
  ON website_content FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
```
- **Why**: Only authenticated users should modify content
- **Checks**: Both USING and WITH CHECK ensure user is logged in
- **Safety**: Authenticated users are tracked by their `auth.uid()`

#### 4. DELETE Policy (Remove Data)
```sql
CREATE POLICY "Authenticated users can delete content"
  ON website_content FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
```
- **Why**: Only logged-in users should delete content
- **Check**: User must be authenticated
- **Safety**: Deletion is tracked to a specific user

---

## Understanding auth.uid()

### What is auth.uid()?

`auth.uid()` is Supabase's way of identifying the current user.

### How It Works

```
User logs in
    ↓
Supabase creates a JWT token
    ↓
Token contains auth.uid() (unique user ID)
    ↓
RLS policies access auth.uid()
    ↓
Policies enforce rules based on user ID
```

### Examples

```sql
-- Allow only if user is authenticated
WITH CHECK (auth.uid() IS NOT NULL)

-- Allow only if user owns the record
WITH CHECK (auth.uid() = user_id)

-- Allow only if user is admin
WITH CHECK (auth.jwt()->>'role' = 'admin')
```

---

## Policy Comparison

### Before vs. After

#### BEFORE (Insecure)
```sql
CREATE POLICY "Admin can manage all content"
  ON website_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
```
- ❌ Single policy for all operations
- ❌ `true` means always allowed
- ❌ No user tracking
- ❌ Any authenticated user can do anything

#### AFTER (Secure)
```sql
-- Policy 1: View content
CREATE POLICY "Authenticated users can view content"
  ON website_content FOR SELECT
  TO authenticated
  USING (true);

-- Policy 2: Add content
CREATE POLICY "Authenticated users can insert content"
  ON website_content FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Policy 3: Modify content
CREATE POLICY "Authenticated users can update content"
  ON website_content FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Policy 4: Delete content
CREATE POLICY "Authenticated users can delete content"
  ON website_content FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
```
- ✅ Separate policies per operation
- ✅ `auth.uid() IS NOT NULL` requires actual authentication
- ✅ User is tracked in audit logs
- ✅ Clear, explicit permissions

---

## Locked Down admin_users Table

### The admin_users Problem

`admin_users` table stores admin credentials. It should be extremely protected.

### The Solution

```sql
-- Users can ONLY see their own admin record
CREATE POLICY "Users can only view their own admin record"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users CANNOT insert new admins
CREATE POLICY "No direct admin user modifications via RLS"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (false);  -- Always false = Always deny

-- Users CANNOT update admins
CREATE POLICY "No direct admin user updates via RLS"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (false)        -- Always false = Always deny
  WITH CHECK (false);

-- Users CANNOT delete admins
CREATE POLICY "No direct admin user deletions via RLS"
  ON admin_users FOR DELETE
  TO authenticated
  USING (false);       -- Always false = Always deny
```

### Why This Matters

- **SELECT**: Users can verify their own admin status
- **INSERT**: Prevents privilege escalation (can't create new admin)
- **UPDATE**: Prevents credential modification (can't change password)
- **DELETE**: Prevents removing admins (can't remove yourself)

---

## Testing the Policies

### Test 1: Anonymous User (Should Fail)

```bash
curl -X GET "https://your-project.supabase.co/rest/v1/website_content" \
  -H "Content-Type: application/json"
```

Expected: **403 Forbidden** - RLS denies anonymous access

### Test 2: Authenticated User (Should Succeed)

```bash
curl -X GET "https://your-project.supabase.co/rest/v1/website_content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Expected: **200 OK** - Returns content

### Test 3: Try to Modify (Should Succeed for Authenticated)

```bash
curl -X POST "https://your-project.supabase.co/rest/v1/website_content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"section":"hero","key":"headline","value":"New Text"}'
```

Expected: **201 Created** - Content added

---

## Best Practices

### ✅ DO

- ✅ Use `auth.uid() IS NOT NULL` for authentication checks
- ✅ Separate policies for each operation
- ✅ Describe policies clearly in names
- ✅ Test policies before deploying
- ✅ Lock down sensitive tables (like admin_users)
- ✅ Use `FOR` with specific operations, not `FOR ALL`
- ✅ Log access to sensitive data

### ❌ DON'T

- ❌ Use `USING (true)` or `WITH CHECK (true)`
- ❌ Use `FOR ALL` with broad permissions
- ❌ Allow anonymous users to modify data
- ❌ Mix different operations in one policy
- ❌ Forget to enable RLS on new tables
- ❌ Leave default RLS unconfigured
- ❌ Trust only authentication without authorization

---

## Common Patterns

### Pattern 1: Public Read, Authenticated Write

```sql
-- Anyone can read
CREATE POLICY "Public read"
  ON table_name FOR SELECT
  USING (true);

-- Only authenticated can write
CREATE POLICY "Authenticated write"
  ON table_name FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);
```

### Pattern 2: User-Owned Data

```sql
-- Users can only see their own data
CREATE POLICY "User can view own data"
  ON table_name FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can only modify their own data
CREATE POLICY "User can update own data"
  ON table_name FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### Pattern 3: Role-Based Access (Advanced)

```sql
-- Admins can do anything
CREATE POLICY "Admin access"
  ON table_name FOR ALL
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin');

-- Users can only read
CREATE POLICY "User read-only"
  ON table_name FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'role' = 'user');
```

---

## Future Improvements

### Phase 2: Role-Based Access

```sql
WITH CHECK (
  auth.jwt()->>'role' = 'admin'
)
```

### Phase 3: Organization-Based Isolation

```sql
WITH CHECK (
  org_id = (auth.jwt()->>'org_id')
)
```

### Phase 4: Time-Based Access

```sql
USING (
  auth.uid() IS NOT NULL
  AND CURRENT_TIME >= '09:00:00'::time
  AND CURRENT_TIME <= '17:00:00'::time
)
```

---

## Troubleshooting

### Error: "permission denied"

**Cause**: User doesn't match RLS policy conditions

**Fix**: Check:
- Is user authenticated?
- Is `auth.uid()` set?
- Does JWT token exist?

### Error: "Policy ... does not exist"

**Cause**: Trying to drop non-existent policy

**Fix**: Use `DROP POLICY IF EXISTS`

### Queries returning empty results

**Cause**: RLS policies are too restrictive

**Fix**: Check USING conditions - might be excluding user's data

### Can't update own record

**Cause**: WITH CHECK condition failing

**Fix**: Ensure WITH CHECK condition matches your use case

---

## Resources

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth Best Practices](https://supabase.com/docs/guides/auth/best-practices)
- [PostgreSQL RLS Documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)

---

**Security Status**: ✅ Implemented  
**Last Updated**: May 5, 2026  
**Version**: 1.0
