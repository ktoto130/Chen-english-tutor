document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Typewriter effect for hero title
    const typedTextSpan = document.getElementById('typed-text');
    if (typedTextSpan) {
        const words = ["Confidence", "Fluency", "Natural Flow", "Ease"];
        const typingSpeed = 100;
        const erasingSpeed = 50;
        const newWordDelay = 2000;
        let wordIndex = 0;
        let charIndex = words[wordIndex].length;

        typedTextSpan.classList.add('cursor-blink');

        function type() {
            if (charIndex < words[wordIndex].length) {
                typedTextSpan.textContent += words[wordIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                typedTextSpan.classList.add('cursor-blink');
                setTimeout(erase, newWordDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingSpeed);
            } else {
                typedTextSpan.classList.remove('cursor-blink');
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, typingSpeed + 500);
            }
        }

        setTimeout(erase, newWordDelay);
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
