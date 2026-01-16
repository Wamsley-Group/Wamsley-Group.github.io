# Email Configuration for Forms

## Overview
All forms in this website use the `mailto:` protocol to send form submissions via email. This approach requires no backend server, external services, or paid subscriptions.

## Current Configuration
All forms are currently configured to send emails to: `pipoat@mail.uc.edu`

## How to Update the Email Address

If you need to change the recipient email address, search for `pipoat@mail.uc.edu` in the following files and replace it with your desired email address:

1. **index.html** - Main contact form
2. **calculator.html** - Calculator page contact form
3. **referral.html** - Referral form
4. **lead-capture.js** - Lead capture modal

### Example:
Search for:
```javascript
mailto:pipoat@mail.uc.edu?subject=...
```

Replace with:
```javascript
mailto:your-email@yourdomain.com?subject=...
```

You can use your code editor's "Find and Replace" feature to update all instances at once.

## How It Works

1. **User fills out a form** - All validation is performed client-side
2. **User clicks Submit** - Form data is formatted into a nicely structured email
3. **Email client opens** - User's default email application opens with pre-filled content
4. **User sends email** - User clicks "Send" in their email client to complete submission

## Benefits

✅ **No cost** - Completely free, no API fees or service charges
✅ **No backend** - Works with static hosting (GitHub Pages)
✅ **No external services** - No third-party dependencies
✅ **Simple setup** - Just update the email address
✅ **Privacy-friendly** - No data sent to third parties

## Email Format

All emails include:
- **Subject line** - Identifies the form source
- **Structured body** - Clearly labeled fields with all form data
- **Timestamps** - For tracking when submissions occur
- **Context** - Information about which page/form was submitted

## Testing

To test the forms:
1. Fill out a form completely
2. Click Submit
3. Your default email client will open with the pre-filled email
4. Review the content and click Send in your email client

## Requirements

Users must have a default email client configured on their device (e.g., Outlook, Mail, Gmail desktop app, Thunderbird, etc.).

## Alternative Solutions

If you need server-side form processing in the future, consider:
- **FormSpree** - Free tier available
- **Netlify Forms** - If hosting on Netlify
- **EmailJS** - Free tier for basic usage
- **Custom backend** - Node.js/Express server

However, for most use cases, the current mailto implementation is sufficient and completely free.
