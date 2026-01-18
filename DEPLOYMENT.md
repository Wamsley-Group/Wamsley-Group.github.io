# Quick Deployment Guide

## Deploy to GitHub Pages (Recommended for Custom Domain!)

### Steps:

1. **Push to main branch**:
   ```bash
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Source: Deploy from main branch
   - Click Save

3. **Set up custom domain** (optional):
   - Add your domain in Settings > Pages > Custom domain
   - Add CNAME file to repository (already included: `wamsleygroup.com`)
   - Configure DNS at your domain registrar

4. **Verify forms on first deployment**:
   - Submit a test form
   - Check email: `pipoat@mail.uc.edu`
   - Click verification link from FormSubmit
   - **One-time only** - future submissions work automatically

**Done!** Forms will work on GitHub Pages with your custom domain.

---

## Deploy to Netlify (Alternative Option)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

### Steps:

1. **Click the deploy button above** or go to [Netlify](https://netlify.com)
2. **Connect your GitHub account** and select this repository
3. **Deploy!** - That's it! No environment variables needed.
4. **Verify forms on first deployment**:
   - Submit a test form
   - Check email: `pipoat@mail.uc.edu`
   - Click verification link from FormSubmit
   - **One-time only** - future submissions work automatically

## What You Get

✅ **Automatic form submissions** - Works on GitHub Pages and Netlify  
✅ **Email notifications** to pipoat@mail.uc.edu  
✅ **Spam protection** - Built-in honeypot filtering  
✅ **No backend needed** - Pure static site  
✅ **Unlimited submissions** - No monthly limits  
✅ **Custom domain support** - Works with wamsleygroup.com

---

## How It Works

Uses **FormSubmit.co** - a free form backend service that works with any static hosting:
- Forms submit to FormSubmit endpoint
- FormSubmit sends email notifications
- Works on GitHub Pages, Netlify, or any host
- No server-side code needed!

---

For detailed setup instructions, see [GITHUB_PAGES_FORMS_SETUP.md](GITHUB_PAGES_FORMS_SETUP.md)
