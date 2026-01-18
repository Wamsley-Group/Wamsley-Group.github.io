# GitHub Pages Forms Setup Guide

## Overview

This website uses **FormSubmit.co** - a free form backend service that works with static sites hosted on GitHub Pages, Netlify, or any other hosting platform. Forms submit directly to FormSubmit, which then sends email notifications to the configured address.

## How It Works

1. User fills out and submits a form
2. Form data is sent to FormSubmit.co via POST request
3. FormSubmit sends email notification to configured address (`pipoat@mail.uc.edu`)
4. User is redirected to success page
5. FormSubmit provides spam protection via honeypot fields

**No custom backend code or server required!**

## Features

✅ **Works on GitHub Pages** - No server-side processing needed
✅ **Works on any hosting platform** - Netlify, Vercel, GitHub Pages, etc.
✅ **No configuration needed** - Just works out of the box
✅ **Free forever** - No limits on submissions
✅ **Spam protection** - Built-in honeypot fields
✅ **Custom redirects** - Redirect to success page after submission
✅ **Email notifications** - Automatic email delivery to configured address

## Setup Instructions

### 1. Email Verification (First Time Only)

When you first deploy this website, FormSubmit needs to verify the email address:

1. Deploy your website to GitHub Pages (or any host)
2. Submit a test form on your live site
3. Check the inbox of `pipoat@mail.uc.edu`
4. Click the confirmation link in the email from FormSubmit
5. After confirmation, all future submissions will work automatically

**Important**: You only need to do this verification ONCE per email address. After confirmation, all forms will work immediately.

### 2. Deployment

Simply deploy the website to GitHub Pages:

```bash
# If using GitHub Pages, just push to main branch
git push origin main
```

GitHub Pages will automatically build and deploy your site. The forms will work immediately after email verification.

### 3. Custom Domain Setup (Optional)

If using a custom domain like `wamsleygroup.com`:

1. Add a `CNAME` file to repository root with your domain name
2. Configure DNS settings at your domain registrar:
   - Add A records pointing to GitHub Pages IPs, OR
   - Add CNAME record pointing to `<username>.github.io`
3. In GitHub repository settings:
   - Go to Settings > Pages
   - Enter your custom domain
   - Enable "Enforce HTTPS"

The forms will work the same way with custom domains.

## Forms Configured

All forms are configured to submit to: `https://formsubmit.co/pipoat@mail.uc.edu`

1. **Contact Form** (`index.html`) - Main contact form
   - Subject: "New Contact Form Submission from Wamsley Group Website"
   
2. **Calculator Contact Form** (`calculator.html`) - Calculator page form
   - Subject: "New Calculator Contact Form Submission from Wamsley Group Website"
   - Includes "form-source: Calculator Page" for tracking
   
3. **Referral Form** (`referral.html`) - Referral submissions
   - Subject: "New Referral Submission from Wamsley Group Website"
   
4. **Lead Capture Modal** (`lead-capture.js`) - Pre-GlassHouse listings capture
   - Subject: "New Lead Capture from Wamsley Group Website"
   - Uses AJAX submission for seamless user experience

## Email Notification Format

FormSubmit will send emails with:
- **From**: noreply@formsubmit.co
- **To**: pipoat@mail.uc.edu
- **Subject**: Custom subject line for each form
- **Body**: All form fields and their values in a clean, readable format

## FormSubmit Configuration Options

Each form includes these hidden fields:

- `_subject` - Custom email subject line
- `_next` - Redirect URL after successful submission (success.html)
- `_captcha` - Set to "false" (can be enabled if spam becomes an issue)
- `_honey` - Honeypot field for spam protection (hidden from users)

## Spam Protection

Built-in spam protection includes:
- **Honeypot fields** - Hidden fields that bots typically fill out
- **reCAPTCHA** - Can be enabled by changing `_captcha` to "true"

If you experience spam:
1. Change `_captcha` value from "false" to "true" in all forms
2. This will add reCAPTCHA v3 verification (no user interaction needed)

### Advanced: Using Hash-Based Endpoints

For enhanced privacy, FormSubmit supports hash-based endpoints that hide the email address:

1. **After initial email verification**, FormSubmit provides a unique hash code
2. Replace email in form actions with the hash: `https://formsubmit.co/{hash}`
3. This prevents email harvesters from scraping your email address
4. The hash is unique to your email and works for all forms

**To get your hash:**
- Check the verification email from FormSubmit
- Or submit a form and FormSubmit will provide the hash in their response
- Update all form actions to use the hash instead of the email

## Changing the Recipient Email

To change the email address that receives form submissions:

1. Find all occurrences of `pipoat@mail.uc.edu` in these files:
   - `index.html`
   - `calculator.html`
   - `referral.html`
   - `lead-capture.js`

2. Replace with your new email address

3. **Important**: After deployment, you MUST verify the new email address:
   - Submit a test form
   - Check the new email inbox
   - Click the verification link from FormSubmit
   - This only needs to be done once

## Advantages Over Other Solutions

### vs. Netlify Forms
✅ Works on GitHub Pages (Netlify Forms only work on Netlify)
✅ No monthly submission limits
✅ No paid plans required

### vs. mailto: links
✅ No email client required on user's device
✅ Professional email formatting
✅ Reliable delivery
✅ Users stay on your website

### vs. Custom Backend
✅ No server to maintain
✅ No code to write
✅ No hosting costs
✅ Instant setup

## Troubleshooting

### Forms not sending emails

1. **First submission after deployment?**
   - Check inbox for verification email from FormSubmit
   - Click the verification link
   - Try submitting again

2. **Check spam folder**
   - FormSubmit emails may be filtered to spam initially
   - Mark as "Not Spam" to whitelist

3. **Verify form action URL**
   - Ensure form action points to: `https://formsubmit.co/YOUR_EMAIL`
   - Check for typos in email address

### Users not redirected after submission

- Verify `_next` hidden field contains full URL: `https://wamsleygroup.com/success.html`
- Ensure `success.html` page exists in repository

### Getting spam submissions

1. Enable reCAPTCHA:
   - Change `<input type="hidden" name="_captcha" value="false">` to `value="true"`
   
2. Additional protection:
   - FormSubmit automatically filters obvious spam
   - Honeypot fields catch most bots

### Form not submitting at all

1. **Check browser console for errors**
   - Open Developer Tools (F12)
   - Look for JavaScript errors
   - Check Network tab for failed requests

2. **For lead-capture modal (AJAX form)**
   - Ensure FormSubmit AJAX endpoint is used: `https://formsubmit.co/ajax/YOUR_EMAIL`
   - Verify JSON formatting in submission

## Testing

### Local Testing
Forms will work even when testing locally:
```bash
# Simply open the HTML file in a browser
open index.html
```

When you submit a form locally, it will:
1. Submit to FormSubmit (requires internet)
2. Send email notification
3. Redirect to success page

### Production Testing
After deploying:
1. Visit your live site
2. Fill out a form with test data
3. Submit the form
4. Verify you're redirected to success page
5. Check email inbox for notification

## Security Notes

- **HTTPS recommended** - GitHub Pages provides HTTPS automatically
- **Email address visibility** - The email address (`pipoat@mail.uc.edu`) is visible in form action attributes. This is required for FormSubmit to work. While this exposes the email to web scrapers, FormSubmit provides robust spam protection via honeypot fields and optional reCAPTCHA. The email address is also publicly visible in other parts of the website.
- **Email obfuscation option** - FormSubmit supports hash-based endpoints after the first verification, which hides the email. To use this, after email verification, FormSubmit will provide a hash that can replace the email in form actions.
- **Client-side validation** - All forms have HTML5 validation
- **Spam protection** - Honeypot fields (`_honey`) catch most bot submissions
- **reCAPTCHA available** - Can be enabled by changing `_captcha` to "true" if spam becomes an issue

## Comparison with Previous Implementation

This website previously used Netlify Forms, which only worked when hosted on Netlify. The new FormSubmit implementation:

**Old approach** (Netlify Forms):
- Only works on Netlify hosting
- Requires Netlify-specific attributes
- Limited to 100 submissions/month on free tier

**New approach** (FormSubmit):
- Works on any hosting platform
- No submission limits
- No vendor lock-in
- Simpler implementation

## Additional Resources

- [FormSubmit Documentation](https://formsubmit.co/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## Support

FormSubmit provides:
- Email support via their website
- Comprehensive documentation
- Active community

For implementation questions:
- Check FormSubmit.co documentation
- Review form HTML in repository
- Test locally first, then deploy
