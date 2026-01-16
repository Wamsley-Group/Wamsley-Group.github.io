# Backend Email Server Setup Guide

## Overview

This website now uses a serverless backend to automatically send emails from form submissions without requiring users to use their email client. The implementation uses Netlify Functions with Nodemailer.

## Architecture

- **Frontend**: Static HTML/CSS/JavaScript forms
- **Backend**: Netlify serverless function (`netlify/functions/send-email.js`)
- **Email Service**: Nodemailer (supports any SMTP server)
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

#### Option A: Using Gmail (Simplest for testing)

1. Go to your Netlify site dashboard
2. Navigate to: Site Settings > Environment Variables
3. Add these variables:
   - `EMAIL_USER`: Your Gmail address (e.g., `pipoat@mail.uc.edu`)
   - `EMAIL_PASS`: Your Gmail app password (see instructions below)
   - `EMAIL_TO`: Recipient email (e.g., `pipoat@mail.uc.edu`)
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`

**To get a Gmail App Password:**
1. Enable 2-Factor Authentication on your Google account
2. Go to: Google Account > Security > 2-Step Verification > App passwords
3. Generate an app password for "Mail"
4. Use this password (not your regular Gmail password) in `EMAIL_PASS`

#### Option B: Using University Email (UC Mail)

For UC Mail (mail.uc.edu), use these settings:
- `EMAIL_USER`: `pipoat@mail.uc.edu`
- `EMAIL_PASS`: Your UC email password or app-specific password
- `EMAIL_TO`: `pipoat@mail.uc.edu`
- `SMTP_HOST`: `smtp.office365.com` (if using Office 365)
- `SMTP_PORT`: `587`

**Note**: You may need to contact UC IT to enable SMTP access or get specific server details.

#### Option C: Using Other Email Services

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
   - Ensure all required variables are set
   - Check for typos in variable names
   - Try re-deploying after setting variables

3. **Test SMTP credentials**:
   - Verify your email credentials work
   - Check if SMTP is enabled for your account
   - Try sending a test email manually

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

## Cost

- **Netlify Free Tier**: 125,000 function invocations/month (more than enough)
- **Email Service**: Free if using your existing email SMTP
- **Total Cost**: $0 for typical use

## Alternative Email Services (if Gmail doesn't work)

### SendGrid (Recommended for production)
- Free tier: 100 emails/day
- More reliable than personal email SMTP
- Setup: https://sendgrid.com/
- Use their SMTP credentials in environment variables

### Mailgun
- Free tier: 5,000 emails/month for 3 months
- Setup: https://www.mailgun.com/

## Migration from mailto:

The forms have been updated to:
1. Use `fetch()` to POST data to the serverless function
2. Show loading state ("Sending..." button)
3. Display success/error messages inline
4. No longer require email client to be configured

## Files Modified

- `index.html` - Contact form
- `calculator.html` - Calculator contact form
- `referral.html` - Referral form
- `lead-capture.js` - Lead capture modal
- `netlify.toml` - Netlify configuration (new)
- `package.json` - Dependencies (new)
- `netlify/functions/send-email.js` - Serverless function (new)

## Support

For issues:
1. Check Netlify function logs
2. Verify environment variables
3. Test SMTP credentials manually
4. Contact Netlify support if deployment issues persist
