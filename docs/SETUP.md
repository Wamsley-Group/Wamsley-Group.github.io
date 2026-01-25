# Setup Guide

Complete guide for deploying and configuring the Wamsley Group website.

## Table of Contents

- [Deployment](#deployment)
- [Form Configuration](#form-configuration)
- [Post-Deployment Steps](#post-deployment-steps)
- [Custom Domain Setup](#custom-domain-setup)
- [Troubleshooting](#troubleshooting)

## Deployment

### GitHub Pages (Recommended)

GitHub Pages is the recommended hosting platform for this site.

**Steps:**

1. **Push to main branch**:
   ```bash
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Source: Deploy from main branch
   - Click Save

3. **Custom domain** (optional):
   - Add your domain in Settings > Pages > Custom domain
   - CNAME file is already configured with `wamsleygroup.com`
   - Configure DNS at your domain registrar (see below)

**What you get:**
- ✅ Automatic HTTPS
- ✅ Free hosting
- ✅ Custom domain support
- ✅ Automatic deployments on push

### Alternative: Netlify

You can also deploy to Netlify:

1. Connect your GitHub repository to Netlify
2. Deploy settings: Build command: (none), Publish directory: `.`
3. Deploy!

## Form Configuration

### Overview

All forms use **FormSubmit.co** - a free service that works with any static hosting platform.

**How it works:**
1. User submits form → Data sent to FormSubmit
2. FormSubmit sends email to `pipoat@mail.uc.edu`
3. User redirected to success page

**Features:**
- ✅ Works on GitHub Pages, Netlify, or any host
- ✅ No backend code needed
- ✅ Unlimited submissions
- ✅ Built-in spam protection
- ✅ Custom redirect pages

### Forms Configured

1. **Contact Form** (`index.html`)
   - Subject: "New Contact Form Submission from Wamsley Group Website"

2. **Calculator Form** (`calculator.html`)
   - Subject: "New Calculator Contact Form Submission from Wamsley Group Website"

3. **Referral Form** (`referral.html`)
   - Subject: "New Referral Submission from Wamsley Group Website"

4. **Lead Capture Modal** (`js/lead-capture.js`)
   - Subject: "New Lead Capture from Wamsley Group Website"
   - Uses AJAX for seamless experience

### Changing Email Address

To change the recipient email:

1. Find and replace `pipoat@mail.uc.edu` in these files:
   - `index.html`
   - `calculator.html`
   - `referral.html`
   - `js/lead-capture.js`

2. Use your code editor's "Find and Replace" feature
3. After deployment, verify the new email (see Post-Deployment Steps)

## Post-Deployment Steps

### ⚠️ Required: Email Verification

After deploying to your live site, you **must** complete a one-time email verification.

**Steps:**

1. **Deploy the site**
   - For GitHub Pages: Push to main branch (auto-deploys)
   - For Netlify: Deploy from connected repository

2. **Submit a test form**
   - Visit your live site at `https://wamsleygroup.com`
   - Fill out any contact form
   - Click Submit
   - You'll be redirected to the success page

3. **Verify your email**
   - Check inbox: `pipoat@mail.uc.edu`
   - Look for email from **FormSubmit**
   - Subject: "Activate Form Submission"
   - **Click the verification link**
   - You'll see a confirmation from FormSubmit

4. **Test again**
   - Submit another test form
   - Check email - you should receive the submission
   - ✅ All forms now work automatically!

### Troubleshooting Email Verification

**"I didn't receive the verification email"**
- Check spam/junk folder
- Wait a few minutes (can take 1-5 minutes)
- Try submitting the form again
- Verify you're checking the correct inbox

**"Forms still don't work after clicking the link"**
- Clear browser cache and try again
- Try a different form on the site
- Check FormSubmit status at formsubmit.co

## Custom Domain Setup

### DNS Configuration

For the custom domain `wamsleygroup.com`:

**Option 1: CNAME Record (Recommended)**
```
Type: CNAME
Name: www
Value: wamsley-group.github.io
```

**Option 2: A Records**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

### GitHub Pages Configuration

1. Go to repository Settings > Pages
2. Custom domain: `wamsleygroup.com`
3. Check "Enforce HTTPS" (wait for SSL certificate to provision)
4. Save

The CNAME file in the repository root ensures the domain persists across deployments.

## Troubleshooting

### Forms Not Sending Emails

1. **First submission?**
   - Check for FormSubmit verification email
   - Click the verification link
   - Try again

2. **Check spam folder**
   - FormSubmit emails may be filtered
   - Mark as "Not Spam"

3. **Verify form action**
   - Should be: `https://formsubmit.co/pipoat@mail.uc.edu`
   - Check for typos

### Users Not Redirected After Submission

- Verify `_next` field contains: `https://wamsleygroup.com/success.html`
- Ensure `success.html` exists in repository
- Check for JavaScript errors in browser console

### Getting Spam Submissions

1. Enable reCAPTCHA:
   - In each form, change `<input type="hidden" name="_captcha" value="false">` to `value="true"`

2. Additional protection:
   - FormSubmit automatically filters spam
   - Honeypot fields catch most bots

### CSS/JS Not Loading

1. Clear browser cache
2. Verify file paths:
   - CSS: `css/index.css`
   - JS: `js/lead-capture.js`
3. Check browser console for 404 errors

### Images Not Loading

1. Verify image paths point to `images/` directory
2. Check file names match exactly (case-sensitive on some servers)
3. Common paths:
   - Logo: `./images/glasshouse-logo.png`
   - Video: `./images/city.mp4`
   - Team photos: `images/jaredwamsley.jpg`, `images/andrewpipo.jpg`

## Advanced Configuration

### Hash-Based Endpoints (Optional)

For enhanced privacy, use FormSubmit's hash-based endpoints:

1. After email verification, FormSubmit provides a unique hash
2. Replace form actions: `https://formsubmit.co/{hash}`
3. This hides your email from web scrapers

### reCAPTCHA (Optional)

To enable Google reCAPTCHA v3:

1. In all forms, change: `<input type="hidden" name="_captcha" value="true">`
2. No additional setup needed - FormSubmit handles it
3. Invisible verification, no user interaction required

## Resources

- [FormSubmit Documentation](https://formsubmit.co/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## Support

For issues:
1. Check this guide first
2. Review FormSubmit.co documentation
3. Check browser console for errors
4. Test locally, then on live site
