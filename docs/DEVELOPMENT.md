# Development Guide

Technical documentation for developers working on the Wamsley Group website.

## Project Structure

```
Wamsley-Group.github.io/
├── css/                    # Stylesheets
│   └── index.css          # Main stylesheet
├── js/                     # JavaScript files
│   └── lead-capture.js    # Lead capture modal for external links
├── images/                 # All images and media
│   ├── *.png              # Favicons and icons
│   ├── *.jpg              # Team photos
│   ├── city.mp4           # Background video
│   └── glasshouse-logo.png # Logo
├── docs/                   # Documentation
│   ├── SETUP.md           # Setup and deployment guide
│   └── DEVELOPMENT.md     # This file
├── *.html                  # Page templates
├── CNAME                   # Custom domain configuration
├── site.webmanifest       # PWA manifest
├── netlify.toml           # Netlify configuration
└── README.md              # Project overview
```

## File Organization

### HTML Pages

All HTML pages are in the root directory:

- `index.html` - Homepage
- `buying.html` - Home buying information
- `sell.html` - Home selling information
- `calculator.html` - Mortgage calculator
- `about-us.html` - Team information
- `local-spotlight.html` - Local area highlights
- `whats-new.html` - Latest updates
- `referral.html` - Referral program
- `404.html` - Error page
- `success.html` - Form submission success page

### Common Components

Each HTML page includes:
- **Navigation bar** - Consistent across all pages
- **Footer** - Contact information and branding
- **Meta tags** - SEO optimization
- **Favicon links** - Browser icons

### Stylesheets

- `css/index.css` - Main stylesheet for all pages
  - Body and layout styles
  - Component-specific styles
  - Utility classes

### JavaScript

- `js/lead-capture.js` - Lead capture modal
  - Intercepts clicks to external listing sites
  - Captures contact info before redirect
  - Uses FormSubmit for data submission

## Tech Stack

### Frontend

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript (ES6+)** - Modern vanilla JS
- **Bootstrap 5.3** - UI framework
- **Font Awesome 6.0** - Icons

### External Services

- **FormSubmit.co** - Form backend service
- **Bootstrap CDN** - CSS and JS delivery
- **Font Awesome CDN** - Icon delivery

### Hosting

- **GitHub Pages** - Primary hosting
- **Netlify** - Alternative hosting option

## Development Workflow

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Wamsley-Group/Wamsley-Group.github.io.git
   cd Wamsley-Group.github.io
   ```

2. **Open locally**:
   - Simply open HTML files in your browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Visit http://localhost:8000
     ```

3. **Make changes**:
   - Edit HTML, CSS, or JS files
   - Refresh browser to see changes
   - No build step required!

### Making Changes

#### Adding a New Page

1. Create new HTML file in root directory
2. Copy structure from existing page (e.g., `index.html`)
3. Update navigation in all pages to include new page
4. Update page-specific content

#### Updating Styles

1. Edit `css/index.css`
2. Styles are global and apply to all pages
3. Use Bootstrap classes when possible
4. Add custom classes for specific components

#### Updating Forms

Forms are configured in two places:

1. **Static forms** (in HTML files):
   ```html
   <form action="https://formsubmit.co/pipoat@mail.uc.edu" method="POST">
     <input type="hidden" name="_subject" value="Form Subject">
     <input type="hidden" name="_next" value="https://wamsleygroup.com/success.html">
     <input type="hidden" name="_captcha" value="false">
     <input type="text" name="_honey" style="display:none">
     <!-- form fields -->
   </form>
   ```

2. **AJAX forms** (in `js/lead-capture.js`):
   - Uses fetch API to submit to FormSubmit AJAX endpoint
   - Provides seamless user experience

### Updating Navigation

Navigation is duplicated across all pages. To update:

1. Edit the `<nav>` section in each HTML file
2. Ensure the active class is on the correct page
3. Keep navigation consistent across all pages

Example:
```html
<li class="nav-item">
  <a class="nav-link active" href="index.html">Home</a>
</li>
```

## Best Practices

### HTML

- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Add alt text to all images
- Use relative paths for internal links

### CSS

- Follow existing naming conventions
- Use Bootstrap classes when available
- Add comments for complex styles
- Keep specificity low

### JavaScript

- Use modern ES6+ syntax
- Add error handling for async operations
- Keep code modular and reusable
- Add comments for complex logic

### Images

- Optimize images before adding (compress JPG/PNG)
- Use appropriate formats (JPG for photos, PNG for logos)
- Add width/height attributes for performance
- Use lazy loading for below-fold images

### Forms

- Always include hidden FormSubmit fields
- Add proper validation attributes
- Include honeypot field for spam protection
- Test on live site after changes

## Testing

### Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Form Testing

1. **Local testing**:
   - Forms will submit to FormSubmit from localhost
   - Use test data to avoid spam

2. **Production testing**:
   - Test all forms after deployment
   - Verify emails are received
   - Check redirect to success page

### Responsive Testing

Test on multiple screen sizes:
- Desktop (1920px, 1366px, 1024px)
- Tablet (768px)
- Mobile (375px, 414px)

## Deployment

### GitHub Pages

Automatic deployment on push to main branch:

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

Changes go live in 1-2 minutes.

### Netlify

Automatic deployment from GitHub:
- Push to main branch
- Netlify detects changes
- Site rebuilds automatically

## Common Tasks

### Adding Team Member

1. Add photo to `images/` directory
2. Edit `about-us.html`
3. Add new card in team section:
   ```html
   <div class="col-md-4">
     <div class="card mb-4 h-100 shadow-sm transition-all aboutuscard">
       <img src="images/teamname.jpg" class="card-img-top" alt="Team Member">
       <div class="card-body">
         <h4 class="card-title">Name</h4>
         <h5>Title</h5>
         <p class="card-text">Description</p>
       </div>
     </div>
   </div>
   ```

### Changing Email Address

Replace `pipoat@mail.uc.edu` in these files:
- `index.html` (contact form)
- `calculator.html` (calculator form)
- `referral.html` (referral form)
- `js/lead-capture.js` (lead capture modal)

Don't forget to verify the new email after deployment!

### Updating Logo

1. Replace `images/glasshouse-logo.png` with new logo
2. Ensure aspect ratio is similar
3. Logo appears in:
   - Navigation bar (all pages)
   - Footer (all pages)

### Adding New External Link

If linking to external listing sites (like GlassHouse):
- Link is automatically captured by `js/lead-capture.js`
- Users must provide contact info before redirect
- Only happens once per session

To disable for specific link:
```html
<a href="https://example.com" data-no-capture>Link</a>
```

## Performance Optimization

### Current Optimizations

- Bootstrap and Font Awesome from CDN (cached across sites)
- Images use lazy loading
- Video is compressed but could be optimized further
- No build step - instant changes

### Potential Improvements

- Compress video file further
- Implement critical CSS
- Add service worker for offline support
- Optimize images with WebP format

## Accessibility

Current accessibility features:
- Semantic HTML structure
- ARIA labels on interactive elements
- Alt text on images
- Keyboard navigation support
- Color contrast compliance

## Security

### Form Security

- Honeypot fields prevent bot submissions
- Optional reCAPTCHA available
- FormSubmit provides spam filtering
- No sensitive data stored

### HTTPS

- Enforced on GitHub Pages
- SSL certificate auto-provisioned
- All external resources use HTTPS

## Troubleshooting

### CSS Not Loading

Check:
1. Path is `css/index.css`
2. File exists in css directory
3. Browser cache (hard refresh: Ctrl+Shift+R)

### JS Not Working

Check:
1. Path is `js/lead-capture.js`
2. Bootstrap is loaded (required for modal)
3. Browser console for errors

### Forms Not Submitting

Check:
1. FormSubmit endpoint is correct
2. Email is verified
3. Network tab for failed requests
4. Hidden fields are present

## Resources

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [FormSubmit Documentation](https://formsubmit.co/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
