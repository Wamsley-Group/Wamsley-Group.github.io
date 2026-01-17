# Backend Email Server Setup Guide

## Overview

This website now uses a serverless backend to automatically send emails from form submissions without requiring users to use their email client. The implementation uses Netlify Functions with Nodemailer configured for Office 365.

## Architecture

- **Frontend**: Static HTML/CSS/JavaScript forms
- **Backend**: Netlify serverless function (`netlify/functions/send-email.js`)
- **Email Service**: Nodemailer with Office 365 SMTP
- **Hosting**: Can be deployed on Netlify, Vercel, or similar platforms

## Setup Instructions

### 1. Deploy to Netlify

1. **Sign up for Netlify** (free): https://www.netlify.com/
2. **Connect your GitHub repository**:
   - Go to Netlify dashboard
   - Click "Add new site" > "Import an existing project"
   - Connect to GitHub and select this repository
3. **Netlify will auto-detect the configuration** from `netlify.toml`

### 2. Configure Email Settings

You need to set up environment variables for email sending:

#### Default Configuration: Office 365 (UC Mail)

For UC Mail (mail.uc.edu), use these settings:

1. Go to your Netlify site dashboard
2. Navigate to: Site Settings > Environment Variables
3. Add these **required** variables:
   - `EMAIL_USER`: `pipoat@mail.uc.edu`
   - `EMAIL_PASS`: Your UC email password or app-specific password (if MFA is enabled)
   - `EMAIL_TO`: `pipoat@mail.uc.edu`

The SMTP configuration is already set to Office 365 defaults:
- `SMTP_HOST`: `smtp.office365.com` (default, can be overridden)
- `SMTP_PORT`: `587` (default, can be overridden)

**Note**: 
- If Multi-Factor Authentication (MFA) is enabled on your UC account, you'll need to create an app-specific password
- You may need to contact UC IT to enable SMTP access if you encounter authentication issues

#### Alternative Option: Using Gmail

If you prefer to use Gmail instead:

1. Go to your Netlify site dashboard
2. Navigate to: Site Settings > Environment Variables
3. Add these variables:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail app password (see instructions below)
   - `EMAIL_TO`: Recipient email
   - `SMTP_HOST`: `smtp.gmail.com` (overrides default)
   - `SMTP_PORT`: `587`

**To get a Gmail App Password:**
1. Enable 2-Factor Authentication on your Google account
2. Go to: Google Account > Security > 2-Step Verification > App passwords
3. Generate an app password for "Mail"
4. Use this password (not your regular Gmail password) in `EMAIL_PASS`

#### Other Email Services

For other SMTP providers (SendGrid, Mailgun, etc.):
- Set `SMTP_HOST` and `SMTP_PORT` according to provider documentation
- Set `EMAIL_USER` and `EMAIL_PASS` with your credentials

### 3. Test the Setup

1. After deploying and configuring environment variables, visit your site
2. Fill out a contact form
3. Click Submit
4. You should see a success message
5. Check your email inbox for the form submission

### 4. Troubleshooting

#### Forms not working locally

The serverless function only works when deployed to Netlify. To test locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Install dependencies
npm install

# Run local development server
netlify dev
```

#### Not receiving emails

1. **Check Netlify function logs**:
   - Go to Netlify dashboard > Functions tab
   - Click on `send-email` function
   - Check logs for errors

2. **Verify environment variables**:
   - Ensure all required variables are set (EMAIL_USER, EMAIL_PASS, EMAIL_TO)
   - Check for typos in variable names
   - Try re-deploying after setting variables

3. **Test SMTP credentials**:
   - Verify your email credentials work by logging into webmail
   - Check if SMTP is enabled for your account
   - For Office 365/UC Mail, verify with IT that SMTP access is enabled

4. **Office 365 specific issues**:
   - Ensure the account has SMTP authentication enabled
   - If using MFA, make sure you're using an app-specific password
   - Check that the account is not blocked or restricted

#### Spam folder

Check your spam/junk folder. Consider:
- Adding your domain to SPF records
- Using a dedicated email service (SendGrid free tier)
- Whitelisting the sending address

## Security Notes

- **Never commit passwords**: Environment variables are stored securely in Netlify
- **HTTPS only**: Forms will only work on HTTPS (Netlify provides this automatically)
- **Rate limiting**: Consider adding rate limiting to prevent spam (not included in basic setup)
- **Email validation**: Server-side validation is included in the function
- **Error handling**: Error details are logged server-side but not exposed to clients for security

## Cost

- **Netlify Free Tier**: 125,000 function invocations/month (more than enough)
- **Email Service**: Free if using your existing email SMTP
- **Total Cost**: $0 for typical use

## Alternative Email Services (for production)

### SendGrid (Recommended for high-volume production)
- Free tier: 100 emails/day
- More reliable than personal email SMTP
- Setup: https://sendgrid.com/
- Use their SMTP credentials in environment variables

### Mailgun
- Free tier: 5,000 emails/month for 3 months
- Setup: https://www.mailgun.com/

## Technical Details

### SMTP Configuration

The serverless function is configured with:
- **Port 587** with STARTTLS (standard for Office 365)
- **TLS cipher configuration** for Office 365 compatibility
- **Secure authentication** using environment variables
- **Error logging** for debugging without exposing details to clients

### Supported Form Types

The backend handles three types of forms:
1. **Contact Form** - General inquiries from index.html and calculator.html
2. **Referral Form** - Client referrals from referral.html
3. **Lead Capture** - GlassHouse listing interest from lead-capture.js

## Migration from mailto:

The forms have been updated to:
1. Use `fetch()` to POST data to the serverless function
2. Show loading state ("Sending..." button)
3. Display success/error messages inline
4. No longer require email client to be configured

## Files Included

- `netlify.toml` - Netlify configuration
- `package.json` - Dependencies (nodemailer)
- `netlify/functions/send-email.js` - Serverless function with Office 365 configuration
- `.gitignore` - Excludes node_modules and sensitive files

## Support

For issues:
1. Check Netlify function logs
2. Verify environment variables are set correctly
3. Test SMTP credentials manually (webmail login)
4. For UC Mail issues, contact UC IT support
5. Contact Netlify support if deployment issues persist
