/**
 * Floating Contact Button
 * 
 * Adds a sticky floating action button for quick contact access
 * Includes phone call, email, and contact form options
 */

(function() {
    'use strict';
    
    // Contact information
    const CONTACT_INFO = {
        phone: '937-369-7777',
        email: 'pipoat@mail.uc.edu',
        phoneDisplay: '(937) 369-7777'
    };
    
    /**
     * Floating contact button HTML
     */
    const floatingButtonHTML = `
        <div id="floatingContact" class="floating-contact-widget" aria-label="Quick contact options">
            <!-- Main Contact Button -->
            <button id="floatingContactBtn" class="floating-contact-btn" aria-label="Open contact options" aria-expanded="false">
                <i class="fas fa-comments"></i>
            </button>
            
            <!-- Quick Contact Options (Hidden by default) -->
            <div id="floatingContactOptions" class="floating-contact-options" style="display: none;">
                <a href="tel:${CONTACT_INFO.phone}" class="floating-contact-option phone-option" aria-label="Call us">
                    <i class="fas fa-phone"></i>
                    <span>Call Now</span>
                </a>
                <a href="mailto:${CONTACT_INFO.email}" class="floating-contact-option email-option" aria-label="Email us">
                    <i class="fas fa-envelope"></i>
                    <span>Email</span>
                </a>
                <a href="index.html#contact" class="floating-contact-option form-option" aria-label="Contact form">
                    <i class="fas fa-edit"></i>
                    <span>Message</span>
                </a>
            </div>
        </div>
    `;
    
    /**
     * CSS styles for floating contact button
     */
    const floatingButtonCSS = `
        .floating-contact-widget {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
            display: flex;
            flex-direction: column-reverse;
            align-items: flex-end;
            gap: 12px;
        }
        
        .floating-contact-btn {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .floating-contact-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(0, 123, 255, 0.6);
        }
        
        .floating-contact-btn:active {
            transform: scale(0.95);
        }
        
        .floating-contact-btn.active {
            background: linear-gradient(135deg, #dc3545 0%, #a71d2a 100%);
        }
        
        .floating-contact-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
            animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .floating-contact-option {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 20px;
            background: white;
            border-radius: 30px;
            text-decoration: none;
            color: #333;
            font-weight: 500;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            white-space: nowrap;
        }
        
        .floating-contact-option:hover {
            transform: translateX(-5px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            color: #007bff;
        }
        
        .floating-contact-option i {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }
        
        .phone-option:hover {
            background: #d4edda;
            color: #155724;
        }
        
        .email-option:hover {
            background: #fff3cd;
            color: #856404;
        }
        
        .form-option:hover {
            background: #cce5ff;
            color: #004085;
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
            .floating-contact-widget {
                bottom: 20px;
                right: 20px;
            }
            
            .floating-contact-btn {
                width: 56px;
                height: 56px;
                font-size: 22px;
            }
            
            .floating-contact-option {
                padding: 10px 16px;
                font-size: 14px;
            }
            
            .floating-contact-option span {
                display: none;
            }
            
            .floating-contact-option i {
                width: 20px;
                height: 20px;
                font-size: 16px;
            }
        }
    `;
    
    /**
     * Initialize floating contact button
     */
    function initFloatingContact() {
        // Add CSS styles
        const styleElement = document.createElement('style');
        styleElement.textContent = floatingButtonCSS;
        document.head.appendChild(styleElement);
        
        // Add HTML
        const container = document.createElement('div');
        container.innerHTML = floatingButtonHTML;
        document.body.appendChild(container.firstElementChild);
        
        // Setup event listeners
        const mainBtn = document.getElementById('floatingContactBtn');
        const options = document.getElementById('floatingContactOptions');
        
        let isOpen = false;
        
        mainBtn.addEventListener('click', function() {
            isOpen = !isOpen;
            
            if (isOpen) {
                options.style.display = 'flex';
                mainBtn.classList.add('active');
                mainBtn.setAttribute('aria-expanded', 'true');
                mainBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                options.style.display = 'none';
                mainBtn.classList.remove('active');
                mainBtn.setAttribute('aria-expanded', 'false');
                mainBtn.innerHTML = '<i class="fas fa-comments"></i>';
            }
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (isOpen && !e.target.closest('.floating-contact-widget')) {
                isOpen = false;
                options.style.display = 'none';
                mainBtn.classList.remove('active');
                mainBtn.setAttribute('aria-expanded', 'false');
                mainBtn.innerHTML = '<i class="fas fa-comments"></i>';
            }
        });
        
        // Track interactions if GTM is available
        if (window.trackGTMEvent) {
            mainBtn.addEventListener('click', function() {
                window.trackGTMEvent('floating_contact_click', {
                    'action': isOpen ? 'close' : 'open'
                });
            });
            
            document.querySelectorAll('.floating-contact-option').forEach(option => {
                option.addEventListener('click', function() {
                    const type = this.classList.contains('phone-option') ? 'phone' :
                                 this.classList.contains('email-option') ? 'email' : 'form';
                    window.trackGTMEvent('quick_contact_used', {
                        'contact_type': type
                    });
                });
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFloatingContact);
    } else {
        initFloatingContact();
    }
})();
