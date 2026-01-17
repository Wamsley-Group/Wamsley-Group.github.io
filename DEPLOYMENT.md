# Quick Deployment Guide

## Deploy to Netlify (Recommended - 5 minutes)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

### Steps:

1. **Click the deploy button above** or go to [Netlify](https://netlify.com)
2. **Connect your GitHub account** and select this repository
3. **Configure environment variables** in Netlify dashboard:
   ```
   EMAIL_USER=pipoat@mail.uc.edu
   EMAIL_PASS=your-password-or-app-password
   EMAIL_TO=pipoat@mail.uc.edu
   ```
   
   Optional (already set as defaults):
   ```
   SMTP_HOST=smtp.office365.com
   SMTP_PORT=587
   ```

4. **Deploy!** Netlify will build and deploy automatically

### Getting App Password (if MFA is enabled):

For Office 365/UC Mail accounts with Multi-Factor Authentication:
1. Contact UC IT or check your Office 365 account settings
2. Generate an app-specific password
3. Use this in `EMAIL_PASS` environment variable

### Alternative: Using Gmail

If you prefer Gmail, add these environment variables:
1. `SMTP_HOST=smtp.gmail.com`
2. `SMTP_PORT=587`
3. Get Gmail App Password:
   - Enable 2FA on your Google account
   - Go to: Google Account → Security → 2-Step Verification → App passwords
   - Generate app password for "Mail"
   - Use this in `EMAIL_PASS`

---

## Alternative: Deploy to Vercel

1. Sign up at [Vercel](https://vercel.com)
2. Import this repository
3. Set the same environment variables
4. Deploy!

---

For detailed setup instructions, see [BACKEND_SETUP.md](BACKEND_SETUP.md)
