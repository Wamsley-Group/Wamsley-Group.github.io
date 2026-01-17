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

### Getting App Password (Required for Duo 2FA):

For Office 365/UC Mail accounts with Duo Multi-Factor Authentication:

**Important**: Duo 2FA **requires an app-specific password** for SMTP access. Your regular password will not work.

**Steps to generate app password:**
1. Log in to Office 365 at https://outlook.office.com
2. Go to Settings → View all Outlook settings → General → Mobile devices (or Account Settings → Security → App passwords)
3. Generate a new app password for "Mail" or "SMTP"
4. Use this generated password in `EMAIL_PASS` environment variable

**Cannot find app password settings?**
- Contact UC IT Support and request SMTP access with app-specific password generation
- They may need to enable this feature for your account

**Security Note**: Never share passwords publicly. If exposed, change immediately.

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
