document.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const signInModal = document.getElementById('signInModal');
    const signUpModal = document.getElementById('signUpModal');
    const videoModal = document.getElementById('videoModal');
    const funnelModal = document.getElementById('funnelModal');
    const trailerIframe = document.getElementById('trailerIframe');
    const closeBtns = document.querySelectorAll('.closeModalBtn');
    const funnelCloseBtn = document.getElementById('funnelCloseBtn');
    
    const switchToSignUp = document.getElementById('switchToSignUp');
    const switchToSignIn = document.getElementById('switchToSignIn');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const watchTrailerBtn = document.getElementById('watchTrailerBtn');

    // Open Modal Function
    const openModal = (modalType) => {
        modalOverlay.classList.remove('hidden');
        // Small delay to allow display:block to apply before changing opacity for transition
        setTimeout(() => {
            modalOverlay.classList.remove('opacity-0');
            modalOverlay.classList.add('opacity-100');
            
            if (modalType === 'signin') {
                signInModal.classList.remove('hidden');
                signUpModal.classList.add('hidden');
                videoModal.classList.add('hidden');
                funnelModal.classList.add('hidden');
                setTimeout(() => {
                    signInModal.classList.remove('scale-95');
                    signInModal.classList.add('scale-100');
                }, 10);
            } else if (modalType === 'signup') {
                signUpModal.classList.remove('hidden');
                signInModal.classList.add('hidden');
                videoModal.classList.add('hidden');
                funnelModal.classList.add('hidden');
                setTimeout(() => {
                    signUpModal.classList.remove('scale-95');
                    signUpModal.classList.add('scale-100');
                }, 10);
            } else if (modalType === 'video') {
                videoModal.classList.remove('hidden');
                signInModal.classList.add('hidden');
                signUpModal.classList.add('hidden');
                funnelModal.classList.add('hidden');
                // Use a placeholder WB/Looney Tunes related trailer since Coyote vs Acme was shelved
                trailerIframe.src = "https://www.youtube.com/embed/e_pE6o4eQ0c?autoplay=1"; 
                setTimeout(() => {
                    videoModal.classList.remove('scale-95');
                    videoModal.classList.add('scale-100');
                }, 10);
            } else if (modalType === 'funnel') {
                funnelModal.classList.remove('hidden');
                signInModal.classList.add('hidden');
                signUpModal.classList.add('hidden');
                videoModal.classList.add('hidden');
                setTimeout(() => {
                    funnelModal.classList.remove('scale-95');
                    funnelModal.classList.add('scale-100');
                }, 10);
            }
        }, 10);
    };
    window.openModal = openModal; // expose globally for onclick="openModal(...)" in HTML

    // Close Modal Function
    const closeModal = () => {
        modalOverlay.classList.remove('opacity-100');
        modalOverlay.classList.add('opacity-0');
        
        signInModal.classList.remove('scale-100');
        signInModal.classList.add('scale-95');
        signUpModal.classList.remove('scale-100');
        signUpModal.classList.add('scale-95');
        videoModal.classList.remove('scale-100');
        videoModal.classList.add('scale-95');
        funnelModal.classList.remove('scale-100');
        funnelModal.classList.add('scale-95');

        setTimeout(() => {
            modalOverlay.classList.add('hidden');
            signInModal.classList.add('hidden');
            signUpModal.classList.add('hidden');
            videoModal.classList.add('hidden');
            funnelModal.classList.add('hidden');
            trailerIframe.src = ""; // Stop video playback
        }, 300); // Wait for transition
    };

    const adLink = 'https://www.profitableratecpmnetwork.com/rhg44wnt?key=934bb847c48598041d64d0ad3051eacf';

    // Event Listeners
    if(signInBtn) signInBtn.addEventListener('click', () => openModal('signin'));
    if(signUpBtn) signUpBtn.addEventListener('click', () => openModal('funnel'));
    if(subscribeBtn) subscribeBtn.addEventListener('click', () => openModal('funnel'));
    if(watchTrailerBtn) watchTrailerBtn.addEventListener('click', () => openModal('funnel'));
    if(funnelCloseBtn) funnelCloseBtn.addEventListener('click', closeModal);

    // Sign In form submit — show 'account not found' error, then direct to funnel
    const signInForm = document.getElementById('signInForm');
    const signInError = document.getElementById('signInError');
    const errorSignUpLink = document.getElementById('errorSignUpLink');
    if(signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Show error banner
            if(signInError) {
                signInError.classList.remove('hidden');
            }
        });
    }
    // 'Create a free account' inside error banner → funnel
    if(errorSignUpLink) errorSignUpLink.addEventListener('click', () => openModal('funnel'));

    // Funnel form submit
    const funnelForm = document.getElementById('funnelForm');
    if(funnelForm) {
        funnelForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = adLink;
        });
    }

    // Standard Sign Up form submit
    const signUpForm = document.querySelector('#signUpModal form');
    if(signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = adLink;
        });
    }
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Switch between modals
    if(switchToSignUp) switchToSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('funnel'); // 'Create free account' always opens funnel
    });

    if(switchToSignIn) switchToSignIn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('signin'); // 'Already have an account?' opens sign in
    });
    // --- New Interactivity ---

    // 1. Countdown Timer
    const targetDate = new Date('2026-09-04T00:00:00').getTime();
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (daysEl) {
        setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                daysEl.textContent = "00";
                hoursEl.textContent = "00";
                minsEl.textContent = "00";
                secsEl.textContent = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minsEl.textContent = minutes.toString().padStart(2, '0');
            secsEl.textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    }

    // 2. 3D Tilt Effect on Movie Card
    const movieCard = document.getElementById('movieInfoCard');
    if (movieCard) {
        movieCard.addEventListener('mousemove', (e) => {
            const rect = movieCard.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // max rotation 5deg
            const rotateY = ((x - centerX) / centerX) * 5;
            
            movieCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        movieCard.addEventListener('mouseleave', () => {
            movieCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // 3. Interactive Star Rating
    const stars = document.querySelectorAll('.star-icon');
    if (stars.length > 0) {
        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                // Light up current and all previous stars
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });
        
        const starContainer = document.getElementById('starContainer');
        if (starContainer) {
            starContainer.addEventListener('mouseleave', () => {
                stars.forEach(s => s.classList.remove('active'));
            });
        }
    }

    // 4. Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => {
                b.classList.remove('text-accent', 'border-accent', 'active');
                b.classList.add('text-gray-500', 'border-transparent');
            });
            
            tabContents.forEach(c => {
                c.classList.remove('active');
            });
            
            // Add active to clicked tab
            btn.classList.add('text-accent', 'border-accent', 'active');
            btn.classList.remove('text-gray-500', 'border-transparent');
            
            // Show corresponding content
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
});
