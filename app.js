document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Navbar scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.querySelector('nav').classList.add('shadow-md', 'bg-white/95');
            header.querySelector('nav').classList.remove('shadow-sm', 'bg-white/80');
        } else {
            header.querySelector('nav').classList.add('shadow-sm', 'bg-white/80');
            header.querySelector('nav').classList.remove('shadow-md', 'bg-white/95');
        }
    });

    // Mobile Menu Controls
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileMenu() {
        mobileMenuOverlay.classList.remove('hidden');
        // Trigger reflow
        void mobileMenuOverlay.offsetWidth;
        mobileMenuOverlay.classList.remove('opacity-0');
        mobileMenuOverlay.classList.add('opacity-100');
        
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        document.body.classList.add('overflow-hidden');
    }

    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('opacity-100');
        mobileMenuOverlay.classList.add('opacity-0');
        
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        document.body.classList.remove('overflow-hidden');
        
        // Hide overlay after transition
        setTimeout(() => {
            mobileMenuOverlay.classList.add('hidden');
        }, 300);
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openMobileMenu);
    }
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Modals
    const qrModal = document.getElementById('qr-modal');
    const qrModalTitle = document.getElementById('qr-modal-title');
    const qrModalDesc = document.getElementById('qr-modal-desc');
    const qrModalImg = document.getElementById('qr-modal-img');
    const closeQrBtn = document.getElementById('close-qr-btn');

    const pricingModal = document.getElementById('pricing-modal');
    const openPricingBtn = document.getElementById('open-pricing-btn');
    const closePricingBtn = document.getElementById('close-pricing-btn');

    // QR Configuration
    const qrData = {
        whatsapp: {
            title: 'WhatsApp Contact',
            desc: 'Scan QR code using WhatsApp camera to connect with Teacher Chen.',
            img: 'assets/whatsapp_qr.jpg'
        },
        wechat: {
            title: 'WeChat Contact',
            desc: 'Scan QR code to add Teacher Chen on WeChat.',
            img: 'assets/wechat_qr.jpg'
        },
        line: {
            title: 'LINE Contact',
            desc: 'Scan QR code to add Teacher Chen on LINE.',
            img: 'assets/line_qr.jpg'
        },
        kakao: {
            title: 'KakaoTalk Contact',
            desc: 'Scan QR code with KakaoTalk to add Genevieve Fabunan (chen_f).',
            img: 'assets/kakao_qr.jpg'
        }
    };

    // Open QR Modal
    document.querySelectorAll('.qr-trigger-btn').forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.getAttribute('data-qr');
            const data = qrData[platform];
            if (data) {
                qrModalTitle.textContent = data.title;
                qrModalDesc.textContent = data.desc;
                qrModalImg.src = data.img;
                
                qrModal.classList.remove('opacity-0', 'pointer-events-none');
                qrModal.querySelector('div').classList.remove('scale-95');
                qrModal.querySelector('div').classList.add('scale-100');
                document.body.classList.add('overflow-hidden');
            }
        });
    });

    // Close QR Modal helper
    function closeQrModal() {
        qrModal.classList.add('opacity-0', 'pointer-events-none');
        qrModal.querySelector('div').classList.remove('scale-100');
        qrModal.querySelector('div').classList.add('scale-95');
        if (!mobileMenu.classList.contains('translate-x-0')) {
            document.body.classList.remove('overflow-hidden');
        }
    }

    if (closeQrBtn) {
        closeQrBtn.addEventListener('click', closeQrModal);
    }
    if (qrModal) {
        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) {
                closeQrModal();
            }
        });
    }

    // Open Pricing Modal
    if (openPricingBtn) {
        openPricingBtn.addEventListener('click', () => {
            pricingModal.classList.remove('opacity-0', 'pointer-events-none');
            pricingModal.querySelector('div').classList.remove('scale-95');
            pricingModal.querySelector('div').classList.add('scale-100');
            document.body.classList.add('overflow-hidden');
        });
    }

    // Close Pricing Modal helper
    function closePricingModal() {
        pricingModal.classList.add('opacity-0', 'pointer-events-none');
        pricingModal.querySelector('div').classList.remove('scale-100');
        pricingModal.querySelector('div').classList.add('scale-95');
        if (!mobileMenu.classList.contains('translate-x-0')) {
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
});
