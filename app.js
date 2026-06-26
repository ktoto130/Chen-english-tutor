document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Typewriter effect on appearance
    const line1 = document.getElementById('hero-line-1');
    const line2 = document.getElementById('hero-line-2');
    
    if (line1 && line2) {
        const text1 = line1.textContent.trim();
        const text2 = line2.textContent.trim();
        
        line1.textContent = '';
        line2.textContent = '';
        
        let charIndex1 = 0;
        let charIndex2 = 0;
        const typingSpeed = 35; // clean, fast-paced typing speed
        
        function typeLine1() {
            if (charIndex1 < text1.length) {
                line1.textContent += text1.charAt(charIndex1);
                charIndex1++;
                setTimeout(typeLine1, typingSpeed);
            } else {
                line1.classList.remove('cursor-blink');
                line1.style.borderRight = 'none';
                line2.classList.add('cursor-blink');
                setTimeout(typeLine2, 150);
            }
        }
        
        function typeLine2() {
            if (charIndex2 < text2.length) {
                line2.textContent += text2.charAt(charIndex2);
                charIndex2++;
                setTimeout(typeLine2, typingSpeed);
            } else {
                setTimeout(() => {
                    line2.classList.remove('cursor-blink');
                    line2.style.borderRight = 'none';
                }, 3000);
            }
        }
        
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) {
            // Trigger animation when the element is revealed (or immediately if already visible)
            if (heroTitle.classList.contains('reveal-visible')) {
                line1.classList.add('cursor-blink');
                setTimeout(typeLine1, 300);
            } else {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.attributeName === 'class' && heroTitle.classList.contains('reveal-visible')) {
                            line1.classList.add('cursor-blink');
                            setTimeout(typeLine1, 200);
                            observer.disconnect();
                        }
                    });
                });
                observer.observe(heroTitle, { attributes: true });
            }
        }
    }

    // Pricing Modal Lightbox
    const pricingModal = document.getElementById('pricing-modal');
    const openPricingBtn = document.getElementById('open-pricing-btn');
    const closePricingBtn = document.getElementById('close-pricing-btn');

    if (openPricingBtn && pricingModal) {
        openPricingBtn.addEventListener('click', () => {
            pricingModal.classList.remove('opacity-0', 'pointer-events-none');
            pricingModal.querySelector('div').classList.remove('scale-95');
            pricingModal.querySelector('div').classList.add('scale-100');
            document.body.classList.add('overflow-hidden');
        });
    }

    function closePricingModal() {
        if (pricingModal) {
            pricingModal.classList.add('opacity-0', 'pointer-events-none');
            pricingModal.querySelector('div').classList.remove('scale-100');
            pricingModal.querySelector('div').classList.add('scale-95');
            document.body.classList.remove('overflow-hidden');
        }
    }

    if (closePricingBtn) {
        closePricingBtn.addEventListener('click', closePricingModal);
    }
    if (pricingModal) {
        pricingModal.addEventListener('click', (e) => {
            if (e.target === pricingModal) {
                closePricingModal();
            }
        });
    }

    // Highlight pricing cards on tap/click (especially for mobile support)
    const priceCards = document.querySelectorAll('.price-card');
    const pricingContainer = document.querySelector('.pricing-container');
    
    if (pricingContainer && priceCards.length > 0) {
        const setActive = (card) => {
            priceCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            pricingContainer.classList.add('has-active');
        };

        priceCards.forEach(card => {
            card.addEventListener('click', (e) => {
                setActive(card);
            });
            card.addEventListener('touchstart', (e) => {
                setActive(card);
            }, { passive: true });
        });

        // Clear selection on clicking outside
        const handleOutsideClick = (e) => {
            if (!pricingContainer.contains(e.target)) {
                priceCards.forEach(c => c.classList.remove('active'));
                pricingContainer.classList.remove('has-active');
            }
        };

        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick, { passive: true });
    }

    // Scroll Reveal Intersection Observer & Scroll Listener Fallback
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        // High reliability scroll animation handler
        const checkReveal = () => {
            const triggerBottom = window.innerHeight * 0.95;
            revealElements.forEach(el => {
                if (!el.classList.contains('reveal-visible')) {
                    const rect = el.getBoundingClientRect();
                    // If element top is above trigger line or inside viewport
                    if (rect.top < triggerBottom) {
                        el.classList.add('reveal-visible');
                    }
                }
            });
        };

        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.01,
                rootMargin: '0px 0px 50px 0px'
            });

            revealElements.forEach(el => revealObserver.observe(el));
        }

        // Always bind scroll, resize, and initial load fallback for absolute mobile reliability
        checkReveal();
        window.addEventListener('scroll', checkReveal, { passive: true });
        window.addEventListener('resize', checkReveal, { passive: true });
    }
});
