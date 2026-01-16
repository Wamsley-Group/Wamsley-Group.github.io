// Lead Capture Modal for External Links
(function() {
    'use strict';

    // Create modal HTML
    const modalHTML = `
    <div class="modal fade" id="leadCaptureModal" tabindex="-1" aria-labelledby="leadCaptureModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="leadCaptureModalLabel">Quick Contact Information</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="text-muted">Please provide your contact information before viewing listings. This helps us serve you better.</p>
                    <form id="leadCaptureForm">
                        <div class="mb-3">
                            <label for="leadName" class="form-label">Full Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="leadName" required>
                        </div>
                        <div class="mb-3">
                            <label for="leadEmail" class="form-label">Email <span class="text-danger">*</span></label>
                            <input type="email" class="form-control" id="leadEmail" required>
                        </div>
                        <div class="mb-3">
                            <label for="leadPhone" class="form-label">Phone Number <span class="text-danger">*</span></label>
                            <input type="tel" class="form-control" id="leadPhone" required>
                        </div>
                        <div class="form-check mb-3">
                            <input type="checkbox" class="form-check-input" id="leadConsent" required>
                            <label class="form-check-label small" for="leadConsent">
                                I consent to being contacted by Wamsley Group regarding real estate services.
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="leadCaptureSubmit">Continue to Listings</button>
                </div>
            </div>
        </div>
    </div>
    `;

    // Add modal to page when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLeadCapture);
    } else {
        initLeadCapture();
    }

    function initLeadCapture() {
        // Check if Bootstrap is available
        if (typeof bootstrap === 'undefined') {
            console.warn('Bootstrap is not loaded. Lead capture modal will not function.');
            return;
        }

        // Add modal HTML to body
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer);

        let targetUrl = '';
        const modalElement = document.getElementById('leadCaptureModal');
        if (!modalElement) {
            console.warn('Lead capture modal element not found.');
            return;
        }
        const modal = new bootstrap.Modal(modalElement);

        // Check if user has already submitted lead info in this session
        function hasSubmittedLead() {
            return sessionStorage.getItem('leadCaptured') === 'true';
        }

        function setLeadCaptured() {
            sessionStorage.setItem('leadCaptured', 'true');
        }

        // Intercept clicks on GlassHouse links
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href*="glasshouserealty.com"]');
            
            if (link && !hasSubmittedLead()) {
                e.preventDefault();
                targetUrl = link.href;
                modal.show();
            }
        });

        // Handle form submission
        document.getElementById('leadCaptureSubmit').addEventListener('click', function() {
            const form = document.getElementById('leadCaptureForm');
            
            if (form.checkValidity()) {
                const leadData = {
                    name: document.getElementById('leadName').value,
                    email: document.getElementById('leadEmail').value,
                    phone: document.getElementById('leadPhone').value,
                    timestamp: new Date().toLocaleString(),
                    source: 'GlassHouse Link Click'
                };

                // Create formatted email
                const emailSubject = 'New Lead Capture - GlassHouse Link Click';
                const emailBody = `New Lead Capture Submission

Name: ${leadData.name}
Email: ${leadData.email}
Phone: ${leadData.phone}
Source: ${leadData.source}
Timestamp: ${leadData.timestamp}
Target URL: ${targetUrl}

This lead was captured when the user attempted to view GlassHouse listings.`;

                // Open mailto link
                const mailtoLink = `mailto:contact@wamsleygroup.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                window.open(mailtoLink, '_blank');

                // Continue with original flow
                setLeadCaptured();
                modal.hide();
                
                // Redirect to target URL after a brief delay
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500);
            } else {
                form.reportValidity();
            }
        });

        // Reset form when modal is closed without submission
        document.getElementById('leadCaptureModal').addEventListener('hidden.bs.modal', function() {
            if (!hasSubmittedLead()) {
                document.getElementById('leadCaptureForm').reset();
            }
        });
    }
})();
