/**
 * Google Tag Manager Integration
 * 
 * This script initializes Google Tag Manager for tracking user interactions
 * and conversions. Replace GTM-XXXXXXX with your actual GTM container ID.
 * 
 * To get your GTM ID:
 * 1. Go to https://tagmanager.google.com/
 * 2. Create or select your container
 * 3. Copy the Container ID (format: GTM-XXXXXXX)
 */

(function() {
    'use strict';
    
    // Google Tag Manager Container ID
    // Replace 'GTM-XXXXXXX' with your actual GTM ID
    const GTM_ID = 'GTM-XXXXXXX';
    
    /**
     * Initialize Google Tag Manager
     */
    function initGTM() {
        // Create dataLayer if it doesn't exist
        window.dataLayer = window.dataLayer || [];
        
        // GTM script injection
        (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer',GTM_ID);
    }
    
    /**
     * Track custom events in GTM
     * @param {string} eventName - Name of the event to track
     * @param {object} eventData - Additional data to send with the event
     */
    window.trackGTMEvent = function(eventName, eventData = {}) {
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': eventName,
                ...eventData
            });
        }
    };
    
    /**
     * Track form submissions
     */
    function trackFormSubmissions() {
        document.addEventListener('submit', function(e) {
            const form = e.target;
            if (form && form.tagName === 'FORM') {
                const formName = form.name || form.id || 'unnamed-form';
                window.trackGTMEvent('form_submission', {
                    'form_name': formName,
                    'form_id': form.id
                });
            }
        });
    }
    
    /**
     * Track outbound link clicks
     */
    function trackOutboundLinks() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (link && link.href) {
                const url = new URL(link.href, window.location.href);
                // Check if it's an external link
                if (url.hostname !== window.location.hostname) {
                    window.trackGTMEvent('outbound_click', {
                        'link_url': link.href,
                        'link_text': link.textContent.trim()
                    });
                }
            }
        });
    }
    
    /**
     * Track phone number clicks
     */
    function trackPhoneClicks() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href^="tel:"]');
            if (link) {
                window.trackGTMEvent('phone_click', {
                    'phone_number': link.href.replace('tel:', '')
                });
            }
        });
    }
    
    /**
     * Track email clicks
     */
    function trackEmailClicks() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href^="mailto:"]');
            if (link) {
                window.trackGTMEvent('email_click', {
                    'email_address': link.href.replace('mailto:', '')
                });
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initGTM();
            trackFormSubmissions();
            trackOutboundLinks();
            trackPhoneClicks();
            trackEmailClicks();
        });
    } else {
        initGTM();
        trackFormSubmissions();
        trackOutboundLinks();
        trackPhoneClicks();
        trackEmailClicks();
    }
})();
