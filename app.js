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

    // Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }
});
