# Post-Deployment Steps for Form Verification

## ⚠️ Important: Required Action After Deployment

After deploying this update to your live site (whether on GitHub Pages or Netlify), you **must** complete a one-time email verification for forms to work.

## Step-by-Step Instructions

### 1. Deploy the Changes

First, merge this PR and deploy to your live site:
- **GitHub Pages**: Changes will auto-deploy when merged to main branch
- **Netlify**: Will auto-deploy from the connected repository

### 2. Submit a Test Form

Once deployed, visit your live site at `https://wamsleygroup.com` and:
1. Navigate to any page with a contact form (e.g., homepage, calculator page)
2. Fill out the form with test information
3. Click the Submit button
4. You will be redirected to the success page

### 3. Verify Your Email Address

**Critical Step:**
1. Check the inbox for: `pipoat@mail.uc.edu`
2. Look for an email from **FormSubmit** with subject like "Activate Form Submission"
3. **Click the verification link** in that email
4. You should see a confirmation message from FormSubmit

### 4. Test Again

After clicking the verification link:
1. Return to your website
2. Submit another test form
3. Check `pipoat@mail.uc.edu` inbox
4. You should now receive the actual form submission email with all the details

## What Happens After Verification?

✅ **All future form submissions work automatically** - no further action needed
✅ **Works for all forms** on the site (contact, calculator, referral, lead capture)
✅ **Emails arrive at** `pipoat@mail.uc.edu` with proper subject lines
✅ **Users are redirected** to the success page after submission
✅ **Spam protection active** via honeypot fields

## Troubleshooting

### "I didn't receive the verification email"

1. **Check spam/junk folder** - FormSubmit emails may be filtered
2. **Wait a few minutes** - Email delivery can take 1-5 minutes
3. **Try submitting the form again** - This will trigger another verification email
4. **Check the correct inbox** - Make sure you're checking `pipoat@mail.uc.edu`

### "I clicked the link but forms still don't work"

1. **Clear your browser cache** and try submitting again
2. **Try a different form** on the site (calculator, referral, etc.)
3. **Check FormSubmit status** - Visit formsubmit.co to ensure service is operational

### "Users are not being redirected after submission"

- Verify the success page exists at `https://wamsleygroup.com/success.html`
- Check browser console for any JavaScript errors
- Ensure HTTPS is enabled on your domain

## Additional Notes

### Email Visibility
The email address (`pipoat@mail.uc.edu`) is visible in the form HTML, which is required for FormSubmit to work. This is a standard practice and FormSubmit provides spam protection. If you experience spam later, you can:
- Enable reCAPTCHA by changing `_captcha` to "true" in forms
- Use hash-based endpoints (see `GITHUB_PAGES_FORMS_SETUP.md`)

### Testing Forms
- Forms can be tested on the live site immediately after verification
- Testing locally (e.g., via `localhost`) will still send real emails to FormSubmit
- Consider using a test email for initial testing if desired

### Form Monitoring
- All form submissions will arrive as emails to `pipoat@mail.uc.edu`
- Each form type has a unique subject line for easy filtering
- Consider setting up email rules to organize submissions by type

## Need Help?

- Refer to `GITHUB_PAGES_FORMS_SETUP.md` for detailed documentation
- Check FormSubmit documentation at https://formsubmit.co/
- Ensure you've completed the email verification step

## Summary Checklist

- [ ] Deploy changes to live site (merge PR)
- [ ] Submit test form on live site
- [ ] Check `pipoat@mail.uc.edu` for verification email
- [ ] Click verification link in email
- [ ] Test form submission again
- [ ] Verify email with form data is received
- [ ] ✅ Forms are now working!

**Once verified, forms will work automatically for all users!**
