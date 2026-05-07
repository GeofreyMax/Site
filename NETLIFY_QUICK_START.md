# Netlify Deployment - Quick Start

## Deploy in 3 Minutes ⚡

### Step 1: Push to GitHub (1 minute)

```bash
# If not already on GitHub, create repo:
git init
git add .
git commit -m "ICR Investment Traders - Ready for Netlify"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/icr-investment-traders.git
git push -u origin main
```

### Step 2: Connect to Netlify (1 minute)

1. Visit https://app.netlify.com
2. Click **"New site from Git"**
3. Choose **GitHub**
4. Select your **icr-investment-traders** repo
5. Click **Deploy site**

Netlify will automatically detect settings and deploy!

### Step 3: Add Environment Variables (1 minute)

1. In Netlify dashboard, select your site
2. Go to **Site Settings → Build & Deploy → Environment**
3. Click **Edit variables**
4. Add two variables:

```
VITE_SUPABASE_URL = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY = your_anon_key_here
```

5. Click **Save**
6. Go to **Deployments** and click **Trigger deploy**

**Done!** Your site is live! 🎉

---

## Get Supabase Credentials

1. Go to https://app.supabase.com
2. Select your **ICR Investment Traders** project
3. Click **Settings** (bottom left)
4. Click **API**
5. Copy these two values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

---

## Verify Deployment

1. Netlify dashboard shows build status
2. Once build completes (green checkmark), click the site URL
3. Website should load
4. Try `/admin/login`:
   - Username: `admin`
   - Password: `1122`
5. Test editing content and adding images

---

## Your Live Site URLs

**Main site**: `https://YOUR-SITE-NAME.netlify.app`  
**Admin panel**: `https://YOUR-SITE-NAME.netlify.app/admin/login`

### Add Custom Domain (Optional)

In Netlify dashboard:
1. Site Settings → Domain management
2. Add custom domain
3. Follow DNS instructions
4. SSL auto-generated

---

## Build Configuration

Everything is configured in `netlify.toml`:
- ✅ Build command: `npm run build`
- ✅ Publish directory: `dist`
- ✅ SPA routing configured
- ✅ Security headers set
- ✅ Cache control optimized

No additional setup needed!

---

## Automatic Deployments

Once connected to GitHub:
- Push code → Netlify auto-deploys
- No manual build needed
- Deploys in ~1-2 minutes
- See status in Netlify dashboard

---

## Troubleshooting

### Build fails
- Check logs in Netlify **Deployments** tab
- Run `npm run build` locally to test

### Admin panel broken
- Verify environment variables are set
- Check variable names are exact:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Trigger redeploy after setting

### Site shows 404s
- Already configured in `netlify.toml`
- Should work automatically

---

## What's Included

✅ Build configuration (netlify.toml)  
✅ SPA routing setup  
✅ Security headers  
✅ Cache optimization  
✅ Environment variable template  
✅ Full deployment guide  

**Everything is ready. Deploy now!** 🚀
