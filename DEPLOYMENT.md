# Quick Deployment Guide

## Deploy to Netlify (Recommended - 5 minutes)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

### Steps:

1. **Click the deploy button above** or go to [Netlify](https://netlify.com)
2. **Connect your GitHub account** and select this repository
3. **Configure environment variables** in Netlify dashboard:
   ```
   EMAIL_USER=pipoat@mail.uc.edu
   EMAIL_PASS=your-app-password-here
   EMAIL_TO=pipoat@mail.uc.edu
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   ```
4. **Deploy!** Netlify will build and deploy automatically

### Getting Gmail App Password:

1. Enable 2FA on your Google account
2. Go to: Google Account → Security → 2-Step Verification → App passwords
3. Generate app password for "Mail"
4. Use this in `EMAIL_PASS` environment variable

---

## Alternative: Deploy to Vercel

1. Sign up at [Vercel](https://vercel.com)
2. Import this repository
3. Set the same environment variables
4. Deploy!

---

For detailed setup instructions, see [BACKEND_SETUP.md](BACKEND_SETUP.md)
