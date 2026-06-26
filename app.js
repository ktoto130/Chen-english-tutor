document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Modal elements
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
            desc: 'Scan QR code using your WhatsApp camera to connect with Teacher Chen.',
            img: 'assets/whatsapp_qr.jpg'
        },
        wechat: {
            title: 'WeChat Contact',
            desc: 'Scan QR code to add Teacher Chen as a friend on WeChat.',
            img: 'assets/wechat_qr.jpg'
        },
        line: {
            title: 'LINE Contact',
            desc: 'Scan QR code to add Teacher Chen on LINE.',
            img: 'assets/line_qr.jpg'
        },
        kakao: {
            title: 'KakaoTalk Contact',
            desc: 'Scan QR code with your KakaoTalk camera to add Genevieve Fabunan (chen_f).',
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
            }
        });
    });

    // Close QR Modal helper
    function closeQrModal() {
        qrModal.classList.add('opacity-0', 'pointer-events-none');
        qrModal.querySelector('div').classList.remove('scale-100');
        qrModal.querySelector('div').classList.add('scale-95');
    }

    closeQrBtn.addEventListener('click', closeQrModal);
    qrModal.addEventListener('click', (e) => {
        if (e.target === qrModal) {
            closeQrModal();
        }
    });

    // Open Pricing Modal
    if (openPricingBtn) {
        openPricingBtn.addEventListener('click', () => {
            pricingModal.classList.remove('opacity-0', 'pointer-events-none');
            pricingModal.querySelector('div').classList.remove('scale-95');
            pricingModal.querySelector('div').classList.add('scale-100');
        });
    }

    // Close Pricing Modal helper
    function closePricingModal() {
        pricingModal.classList.add('opacity-0', 'pointer-events-none');
        pricingModal.querySelector('div').classList.remove('scale-100');
        pricingModal.querySelector('div').classList.add('scale-95');
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

    // Scroll Navbar Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.querySelector('nav').classList.add('bg-edu-dark/85', 'border-slate-800/80');
            header.querySelector('nav').classList.remove('bg-edu-card/60', 'border-slate-800/50');
        } else {
            header.querySelector('nav').classList.remove('bg-edu-dark/85', 'border-slate-800/80');
            header.querySelector('nav').classList.add('bg-edu-card/60', 'border-slate-800/50');
        }
    });
});
