# Deploy ICR Investment Traders to Netlify

## Quick Deploy (3 Steps)

### Step 1: Connect GitHub to Netlify ⭐ (Easiest)

If you have the code on GitHub:

1. Go to [Netlify](https://app.netlify.com)
2. Click **"New site from Git"**
3. Select **GitHub**
4. Authorize Netlify with GitHub
5. Select your **ICR-Investment-Traders** repository
6. Click **Deploy site**

Netlify will:
- ✅ Detect your site automatically
- ✅ Run `npm run build` command
- ✅ Deploy to the internet
- ✅ Give you a live URL

**Done!** Your site is live in ~1 minute.

---

### Step 2: Set Environment Variables 🔑

After deploying, add Supabase credentials:

1. Go to **Netlify Dashboard**
2. Select your site
3. Go to **Site Settings → Build & Deploy → Environment**
4. Click **Edit variables**
5. Add these variables:

```
VITE_SUPABASE_URL = your-supabase-url
VITE_SUPABASE_ANON_KEY = your-supabase-anon-key
```

**Get these values from**:
- Go to Supabase → Project Settings → API
- Copy `Project URL` and `anon public` key

6. Click **Save**
7. Go back to **Deployments**
8. Click **Trigger deploy** on latest deployment
9. Done! ✅

---

### Step 3: Verify Deployment ✅

1. Click the **site URL** in Netlify dashboard
2. Website should load
3. Check admin panel: `/admin/login`
4. Login: admin / 1122
5. Test editing content
6. Verify images load

**Success!** Your site is live! 🎉

---

## Detailed Step-by-Step Guide

### Prerequisites

- GitHub account (recommended) or
- Git installed locally
- Netlify account (free)
- Supabase project with credentials

### Method 1: Deploy via GitHub (Recommended) ⭐

#### 1A: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: ICR Investment Traders website with admin panel"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/icr-investment-traders.git

# Push to GitHub
git push -u origin main
```

#### 1B: Connect to Netlify

1. Visit [Netlify App](https://app.netlify.com)
2. Click **"New site from Git"**
3. Choose **GitHub**
4. Authorize with GitHub
5. Find your **icr-investment-traders** repo
6. Click **Deploy site**

**Netlify will automatically**:
- Detect React + Vite project
- Run `npm install`
- Run `npm run build`
- Deploy the `dist` folder
- Provide a live URL

#### 1C: Add Environment Variables

1. In Netlify dashboard, go to **Site Settings**
2. Select **Build & Deploy → Environment**
3. Click **Edit variables**
4. Add these two variables:

```
VITE_SUPABASE_URL = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIs... (your anon key)
```

5. Click **Save**
6. Trigger a **redeploy** for changes to take effect

#### 1D: Redeploy

1. Go to **Deployments** tab
2. Click the **three dots** on latest deployment
3. Select **Redeploy**
4. Wait for build to complete
5. Click site URL to verify

---

### Method 2: Deploy via CLI

If you prefer command line:

```bash
# Install Netlify CLI (one time)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Connect site
netlify init

# Follow prompts to:
# - Create new Netlify site
# - Set build command: npm run build
# - Set publish directory: dist
# - Configure environment variables

# Deploy
netlify deploy --prod

# Your site will be live!
```

---

### Method 3: Manual Drag & Drop

For quick testing:

1. Build locally:
```bash
npm run build
```

2. Go to [Netlify Drop](https://app.netlify.com/drop)

3. Drag the `dist` folder onto the page

4. Your site gets a temporary URL

**Note**: This won't have environment variables, so admin panel won't work. Use Method 1 for production.

---

## Environment Variables Guide

### Where to Get Them

**Supabase:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your **ICR Investment Traders** project
3. Click **Settings** (bottom left)
4. Click **API**
5. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### Where to Set Them in Netlify

1. Netlify dashboard
2. Select your site
3. **Site Settings** (top menu)
4. **Build & Deploy** (left sidebar)
5. **Environment** section
6. Click **Edit variables**
7. Add your Supabase credentials
8. Click **Save**

### Verify Variables Work

1. Go to **Deployments**
2. Click latest deployment
3. Check **Build** tab for "Build succeeded"
4. Visit site URL
5. Check browser console (F12) for any errors

---

## Custom Domain Setup

After deploying, add your custom domain:

1. In Netlify dashboard, go to **Domain Settings**
2. Click **Add custom domain**
3. Enter your domain (e.g., icr-investment-traders.com)
4. Follow DNS setup instructions
5. SSL certificate auto-provisioned (free)

**Note**: Domain setup takes 24-48 hours to propagate.

---

## Deploy Settings Reference

**Site name**: (auto-generated, can customize)
**Build command**: `npm run build`
**Publish directory**: `dist`
**Node version**: 18 (default, recommended)

These are configured in `netlify.toml` (already created for you).

---

## Troubleshooting

### Site shows "page not found" errors

**Cause**: SPA routing not configured

**Fix** (Already done):
- `netlify.toml` has SPA redirect
- Should work automatically
- If not, check netlify.toml exists

### Admin panel doesn't work

**Cause**: Supabase credentials missing

**Fix**:
1. Verify environment variables are set
2. Check variable names exactly:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Redeploy after setting variables

### Build fails

**Cause**: Missing dependencies or build error

**Solution**:
1. Check build logs in Netlify dashboard
2. Run `npm run build` locally to test
3. Fix any errors shown
4. Commit and push again
5. Netlify will auto-redeploy

### Images not loading

**Cause**: CORS or image URL issues

**Check**:
1. Image URLs are HTTPS (not HTTP)
2. External URLs (Pexels, etc.) are accessible
3. Browser console shows specific errors
4. Test URLs directly in browser

### Slow performance

**Optimize**:
1. Check Netlify analytics
2. Use CDN (enabled by default)
3. Optimize images
4. Check network tab in browser dev tools

---

## Security Best Practices

### What's Already Configured

✅ **netlify.toml** includes:
- Security headers (X-Frame-Options, CSP, etc.)
- Cache control (1 year for assets, no cache for HTML)
- HTTPS enforcement (automatic)

### Additional Steps

1. **Environment Variables**:
   - Never commit `.env` files
   - Set in Netlify dashboard only
   - Use site-specific values

2. **Supabase Security**:
   - Apply RLS security fix (see SECURITY_FIX.md)
   - Use anon key (not service role key)
   - Keep keys secure

3. **HTTPS**:
   - Automatic with Netlify
   - Always enabled
   - Certificate auto-renewed

4. **Access**:
   - Admin panel at `/admin/login`
   - Protected routes configured
   - Session-based auth

---

## Post-Deployment Checklist

After site goes live:

- [ ] Site loads without errors
- [ ] Homepage displays correctly
- [ ] All sections load (About, Services, etc.)
- [ ] Images display properly
- [ ] Admin panel accessible at `/admin/login`
- [ ] Can login with admin/1122
- [ ] Can edit content
- [ ] Can add/delete images
- [ ] Contact form works (if implemented)
- [ ] Mobile view responsive
- [ ] No console errors
- [ ] Browser dev tools show no warnings

---

## Monitoring & Maintenance

### Check Site Health

**In Netlify Dashboard**:
1. Click your site
2. Check **Analytics** for:
   - Traffic stats
   - Build status
   - Performance metrics

### View Logs

1. Go to **Deploys** tab
2. Click a deployment
3. View **Build** and **Deploy** logs

### Redeploy

Push new code or trigger redeploy:
- Auto-redeploy on GitHub push
- Manual redeploy via dashboard
- No downtime during redeployment

---

## Next Steps

### Immediately After Deploy

1. ✅ Test website thoroughly
2. ✅ Verify admin panel works
3. ✅ Check that content loads
4. ✅ Test mobile view

### This Week

1. Set up custom domain
2. Test all admin features
3. Add SSL certificate (auto done)
4. Monitor for any errors

### This Month

1. Set up analytics (Google Analytics, Netlify Analytics)
2. Configure backups
3. Set up monitoring/alerts
4. Plan scaling if needed

---

## Support & Resources

**Netlify Docs**: https://docs.netlify.com
**Netlify Support**: https://support.netlify.com
**React + Netlify**: https://docs.netlify.com/frameworks/react

---

## Quick Reference

| Task | Time | How |
|------|------|-----|
| Deploy site | 1 min | Connect GitHub → Netlify |
| Add domain | 2 min | Netlify dashboard |
| Set env vars | 2 min | Site Settings → Environment |
| View logs | 1 min | Deployments → Build logs |
| Redeploy | 1 min | Deployments → Redeploy |

---

**Status**: Ready to Deploy  
**Estimated Deploy Time**: 2-5 minutes  
**Difficulty**: Easy  
**No Server Setup Required**: ✅ (Netlify handles it)  

**Deploy now and get your website live! 🚀**
