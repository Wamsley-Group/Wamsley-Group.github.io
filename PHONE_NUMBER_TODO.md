# Phone Number Update Required

## Action Required Before Production
The website currently uses a **placeholder phone number** `+19375551234` (with the fictional 555 prefix) that needs to be replaced with the actual Wamsley Group business phone number.

## Files to Update
Search and replace `+19375551234` and `(937) 555-1234` with the actual phone number in these files:

### HTML Files (9 total)
- `index.html` (3 occurrences)
- `buying.html` (3 occurrences)
- `sell.html` (3 occurrences)
- `about-us.html` (2 occurrences)
- `calculator.html` (2 occurrences)
- `local-spotlight.html` (2 occurrences)
- `whats-new.html` (2 occurrences)
- `referral.html` (2 occurrences)
- `404.html` (2 occurrences)

## How to Update
1. Obtain the actual Wamsley Group business phone number
2. Run a find-and-replace across all files:
   ```bash
   # Replace tel: links
   find . -name "*.html" -type f -exec sed -i 's/tel:+19375551234/tel:+1ACTUALNUMBER/g' {} \;
   
   # Replace displayed phone numbers
   find . -name "*.html" -type f -exec sed -i 's/(937) 555-1234/(937) XXX-XXXX/g' {} \;
   ```
3. Test all call buttons to ensure they work correctly on mobile devices
4. Verify the phone number displays correctly in all locations

## Locations Where Phone Number Appears
- **Navigation bar** - "Call Now" button (all pages)
- **Hero section** - "Call Now" button (homepage)
- **Contact section** - Large "Call Now" button (homepage)
- **Floating action button** - Bottom-right corner (all pages)
- **Call-to-action sections** - Buy/Sell pages

## Important Notes
- The 555 prefix is reserved for fictional use in North America
- Having a real, working phone number is critical for lead capture
- Test the tel: links on a mobile device after updating
- Consider adding the phone number to the footer as well for additional visibility
