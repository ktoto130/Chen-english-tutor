document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
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
        priceCards.forEach(card => {
            card.addEventListener('click', (e) => {
                priceCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                pricingContainer.classList.add('has-active');
            });
        });

        // Clear selection on clicking outside
        document.addEventListener('click', (e) => {
            if (!pricingContainer.contains(e.target)) {
                priceCards.forEach(c => c.classList.remove('active'));
                pricingContainer.classList.remove('has-active');
            }
        });
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
