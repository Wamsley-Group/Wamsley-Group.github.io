# Netlify Forms Setup Guide

## Overview

This website uses **Netlify Forms** - a built-in Netlify feature that handles form submissions automatically without any server-side code or custom JavaScript. Forms are submitted directly to Netlify, which can then send email notifications.

## How It Works

1. User fills out and submits a form
2. Netlify automatically captures the form data
3. Netlify sends email notification to configured address
4. User is redirected to success page

**No custom backend code required!**

## Setup Instructions

### 1. Deploy to Netlify

1. Sign up for Netlify (free): https://www.netlify.com/
2. Connect your GitHub repository:
   - Go to Netlify dashboard
   - Click "Add new site" > "Import an existing project"
   - Connect to GitHub and select this repository
3. Deploy! Netlify will auto-detect the configuration

### 2. Enable Form Notifications

After deploying:

1. Go to your site's dashboard on Netlify
2. Navigate to: **Site Settings** > **Forms** > **Form notifications**
3. Click "Add notification" > "Email notification"
4. Configure:
   - **Email to notify**: `pipoat@mail.uc.edu`
   - **Event to listen for**: New form submission
   - **Form**: Choose "All forms" or select specific forms

That's it! You'll now receive emails for all form submissions.

### 3. Verify Forms Are Working

1. After deployment, visit your site
2. Fill out any form and submit
3. Check Netlify dashboard: **Site > Forms** tab to see submissions
4. Check your email for notifications

## Forms Configured

1. **Contact Form** (`index.html`) - Main contact form
2. **Calculator Contact Form** (`calculator.html`) - Calculator page form
3. **Referral Form** (`referral.html`) - Referral submissions
4. **Lead Capture Modal** (`lead-capture.js`) - Pre-GlassHouse listings capture

## Email Notification Format

Netlify will send emails with:
- Subject: "[Site Name] New form submission: [Form Name]"
- Body: All form fields and their values
- Sender: notifications@netlify.com

To customize the email format, you can:
1. Use Netlify's webhook feature to send to a custom endpoint
2. Set up Zapier integration (requires Zapier account)
3. Use the Netlify API to retrieve submissions programmatically

## Viewing Form Submissions

All submissions are stored in Netlify:
1. Go to your site dashboard
2. Click "Forms" in the top navigation
3. View all submissions, export to CSV, or manage spam

## Spam Protection

Netlify Forms includes:
- Built-in spam filtering
- Honeypot fields (already configured in forms)
- Recaptcha option (can be enabled if needed)

To enable Recaptcha:
1. Get Recaptcha keys from Google
2. Add to Netlify: Site Settings > Forms > Enable Recaptcha
3. Add `data-netlify-recaptcha="true"` to forms

## Cost

- **Netlify Free Tier**: 100 form submissions/month
- **Pro Plan** ($19/month): 1,000 submissions/month
- **Business Plan** ($99/month): Unlimited submissions

For most small business websites, the free tier is sufficient.

## Troubleshooting

### Forms not showing up in Netlify

1. Make sure forms have `data-netlify="true"` attribute
2. Ensure forms have `name` attribute
3. All input fields must have `name` attributes
4. Re-deploy the site after making changes

### Not receiving email notifications

1. Check spam/junk folder
2. Verify email notification is configured in Netlify
3. Check Netlify dashboard to confirm submissions are being received
4. Try re-configuring the email notification

### Form redirects not working

- Make sure `action="/success.html"` is set on forms
- The `success.html` page must exist in your repository

### Getting 405 errors on form submission

If you're getting HTTP 405 (Method Not Allowed) errors when submitting forms:

1. **Check netlify.toml redirect rules**: Ensure redirect rules don't intercept POST requests
   - Redirect rules should only apply to GET requests: `conditions = {Method = ["GET"]}`
   - Add `force = false` to allow existing routes (like form endpoints) to take precedence
   
2. **Current configuration** (in `netlify.toml`):
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
     force = false
     conditions = {Method = ["GET"]}
   ```
   This ensures that:
   - Only GET requests are redirected for SPA routing
   - POST requests (form submissions) pass through to Netlify Forms
   - Forms can be processed correctly without 405 errors

3. **Forms not appearing in Netlify dashboard**: After fixing 405 errors and redeploying, form submissions should appear in the Netlify Forms dashboard

## Advantages of Netlify Forms

✅ **No custom code**: No serverless functions or backend needed
✅ **No SMTP setup**: No email server configuration
✅ **Built-in spam protection**: Honeypot and filtering included
✅ **Form data storage**: All submissions saved in Netlify dashboard
✅ **Free tier**: 100 submissions/month at no cost
✅ **Easy setup**: Just add HTML attributes

## Migration from Custom Backend

The previous implementation used custom Netlify Functions with Nodemailer. The new implementation is simpler:

**Old approach**:
- Custom serverless function (`send-email.js`)
- Nodemailer dependency
- SMTP configuration required
- More complex to maintain

**New approach** (Netlify Forms):
- No custom code
- No dependencies
- No SMTP setup
- Much simpler

## Additional Resources

- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)
- [Form Notifications Guide](https://docs.netlify.com/forms/notifications/)
- [Spam Filtering](https://docs.netlify.com/forms/spam-filters/)
