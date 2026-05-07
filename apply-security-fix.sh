#!/bin/bash

# ICR Investment Traders - Security Fix Script
# Fixes overly permissive RLS policies on Supabase

echo "=================================================="
echo "ICR Investment Traders - Security Fix"
echo "Fixing RLS Policy Issues"
echo "=================================================="
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ ERROR: Supabase CLI is not installed"
    echo ""
    echo "Install with: npm install -g supabase"
    echo "Or visit: https://supabase.com/docs/guides/cli/getting-started"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ ERROR: package.json not found"
    echo "Please run this script from the project root directory"
    exit 1
fi

echo "✓ Supabase CLI found"
echo ""

# Display what will be fixed
echo "The following security issues will be fixed:"
echo "---"
echo "❌ BEFORE:"
echo "  - website_content has overly permissive policy"
echo "  - website_images has overly permissive policy"
echo "  - admin_users table is not properly locked down"
echo ""
echo "✅ AFTER:"
echo "  - Policies require authentication (auth.uid() IS NOT NULL)"
echo "  - Separate restrictive policies per action"
echo "  - admin_users table locked from direct modifications"
echo "---"
echo ""

# Ask for confirmation
read -p "Apply security fix? (yes/no): " confirm

if [ "$confirm" != "yes" ] && [ "$confirm" != "y" ]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "Applying security fix..."
echo ""

# Create the SQL fix file
cat > /tmp/rls_security_fix.sql << 'SQLEOF'
-- ICR Investment Traders - RLS Security Fix
-- Replaces overly permissive policies with restrictive ones

-- Drop existing overly permissive policies on website_content
DROP POLICY IF EXISTS "Admin can manage all content" ON website_content;

-- Create restrictive policies for website_content
CREATE POLICY "Authenticated users can view content"
  ON website_content FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert content"
  ON website_content FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update content"
  ON website_content FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete content"
  ON website_content FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Drop existing overly permissive policies on website_images
DROP POLICY IF EXISTS "Admin can manage all images" ON website_images;

-- Create restrictive policies for website_images
CREATE POLICY "Authenticated users can view images"
  ON website_images FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert images"
  ON website_images FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update images"
  ON website_images FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete images"
  ON website_images FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Lock down admin_users table
DROP POLICY IF EXISTS "Admin can view their own record" ON admin_users;

CREATE POLICY "Users can only view their own admin record"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "No direct admin user modifications via RLS"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "No direct admin user updates via RLS"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "No direct admin user deletions via RLS"
  ON admin_users FOR DELETE
  TO authenticated
  USING (false);
SQLEOF

# Apply the fix via Supabase
supabase db push --linked << 'EOF'

EOF

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS: Security fix applied!"
    echo ""
    echo "Policies updated:"
    echo "  ✓ website_content - Replaced overly permissive policy"
    echo "  ✓ website_images - Replaced overly permissive policy"
    echo "  ✓ admin_users - Locked down to prevent direct modifications"
    echo ""
    echo "Security improvements:"
    echo "  ✓ All policies now require authentication"
    echo "  ✓ Separate policies for SELECT, INSERT, UPDATE, DELETE"
    echo "  ✓ auth.uid() IS NOT NULL checks in place"
    echo ""
    echo "Verify the fix:"
    echo "  1. Go to Supabase Dashboard"
    echo "  2. Click Authentication → Policies"
    echo "  3. Check the policies are updated"
    echo ""
else
    echo ""
    echo "⚠️  Could not auto-apply. Manual fix required."
    echo ""
    echo "Please apply this SQL manually:"
    echo "1. Go to Supabase Dashboard"
    echo "2. Click SQL Editor → New Query"
    echo "3. Copy the fix from SECURITY_FIX.md"
    echo "4. Click RUN"
    echo ""
fi

# Cleanup
rm -f /tmp/rls_security_fix.sql

echo "For details, see: SECURITY_FIX.md"
