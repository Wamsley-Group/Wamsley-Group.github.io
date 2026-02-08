# Google Tag Manager Setup Instructions

This website includes Google Tag Manager (GTM) integration for tracking user interactions and conversions.

## Setting Up Your GTM Container ID

1. **Create a GTM Account** (if you don't have one):
   - Go to https://tagmanager.google.com/
   - Sign in with your Google account
   - Click "Create Account"
   - Follow the setup wizard

2. **Get Your Container ID**:
   - Once your account is created, you'll receive a Container ID (format: `GTM-XXXXXXX`)
   - Copy this ID

3. **Update the Website**:
   - Open `/js/google-tag.js`
   - Find the line: `const GTM_ID = 'GTM-XXXXXXX';`
   - Replace `GTM-XXXXXXX` with your actual Container ID
   - Save the file

4. **Update noscript iframes** (for users with JavaScript disabled):
   - Search all HTML files for `GTM-XXXXXXX`
   - Replace with your actual Container ID
   - Files to update:
     - index.html
     - about-us.html
     - buying.html
     - sell.html
     - calculator.html
     - local-spotlight.html
     - whats-new.html
     - referral.html
     - 404.html
     - success.html

## Automated Tracking Features

The GTM implementation automatically tracks:

- **Form Submissions**: All form submissions are tracked with form name and ID
- **Outbound Link Clicks**: Clicks to external websites
- **Phone Number Clicks**: Clicks on `tel:` links
- **Email Clicks**: Clicks on `mailto:` links
- **Floating Contact Widget**: Interactions with the floating contact button
- **Quick Contact Actions**: Usage of one-click contact options

## Setting Up Tags in GTM

After installing your Container ID, you can create tags in GTM to send data to:

- Google Analytics 4 (GA4)
- Google Ads conversion tracking
- Facebook Pixel
- Other marketing and analytics platforms

### Example: Setting up GA4

1. In GTM, click "New Tag"
2. Choose "Google Analytics: GA4 Configuration"
3. Enter your GA4 Measurement ID
4. Set trigger to "All Pages"
5. Save and publish your container

## Testing

1. After updating the Container ID, load your website
2. Open Chrome DevTools (F12)
3. Go to the Network tab
4. Filter by "gtm"
5. You should see requests to `googletagmanager.com`

Alternatively, install the [Google Tag Assistant](https://tagassistant.google.com/) Chrome extension to verify GTM is working.

## Custom Events

The following custom events are tracked and can be used to create triggers in GTM:

- `form_submission` - When any form is submitted
  - Parameters: `form_name`, `form_id`
- `outbound_click` - When a user clicks an external link
  - Parameters: `link_url`, `link_text`
- `phone_click` - When a user clicks a phone number
  - Parameters: `phone_number`
- `email_click` - When a user clicks an email address
  - Parameters: `email_address`
- `floating_contact_click` - When the floating contact button is clicked
  - Parameters: `action` (open/close)
- `quick_contact_used` - When a quick contact option is used
  - Parameters: `contact_type` (phone/email/form)

## Support

For more information about Google Tag Manager, visit:
- [GTM Documentation](https://support.google.com/tagmanager)
- [GTM Developer Guide](https://developers.google.com/tag-manager)
