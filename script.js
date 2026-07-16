document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Preloader Fade-out
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 600); // Small initial delay for smoother rendering
        });
        
        // Fallback in case window load doesn't trigger immediately
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 3000);
    }

    // 2. Magic Cursor Tracking & Easing
    const cursor = document.getElementById('magic-cursor');
    if (cursor) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ballX = window.innerWidth / 2;
        let ballY = window.innerHeight / 2;
        const speed = 0.15; // Smooth interpolation speed

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            const distX = mouseX - ballX;
            const distY = mouseY - ballY;
            
            // Apply easing
            ballX += distX * speed;
            ballY += distY * speed;
            
            cursor.style.left = `${ballX}px`;
            cursor.style.top = `${ballY}px`;
            
            requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);

        const interactiveElements = document.querySelectorAll('a, button, .btn, select, option, input, textarea, .faq-question, .service-card-dermix, .expert-card-dermix, .bio-item-row');
        
        interactiveElements.forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                cursor.classList.add('hovering');
            });
            elem.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovering');
            });
        });
    }

    // 3. YouTube Video Modal (Watch Our Story Explainer)
    const playVideoBtn = document.getElementById('playVideoBtn');
    const closeVideoBtn = document.getElementById('closeVideoBtn');
    const videoModal = document.getElementById('videoModal');
    const videoIframe = document.getElementById('videoIframe');
    const videoURL = "https://www.youtube.com/embed/Y-x0efG1seA?autoplay=1&mute=0&rel=0";

    if (playVideoBtn && videoModal && videoIframe) {
        playVideoBtn.addEventListener('click', () => {
            videoIframe.src = videoURL;
            videoModal.classList.add('active');
        });

        const closePlatform = () => {
            videoModal.classList.remove('active');
            videoIframe.src = ""; // Clear iframe src to stop video audio
        };

        if (closeVideoBtn) {
            closeVideoBtn.addEventListener('click', closePlatform);
        }

        // Close modal when clicking outside content container
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closePlatform();
            }
        });
    }

    // 4. Mobile Menu Navigation
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 5. Header Transition on Scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 6. Smooth Parallax Scrolling Effect for Hero Section
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            // Easing slide background translation
            heroBg.style.transform = `translate3d(0, ${scrolled * 0.45}px, 0)`;
        });
    }

    // 7. Section Scroll Reveals (Intersection Observer)
    const revealElements = document.querySelectorAll('.fade-up-init');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-up-show');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // 8. General Stats Counters Increments
    const animateCounters = (elements) => {
        elements.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const countTo = target;
            const duration = 2000;
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out quadratic calculation
                const easeProgress = progress * (2 - progress);
                
                const currentValue = Math.floor(easeProgress * countTo);
                stat.textContent = currentValue;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };

            requestAnimationFrame(updateCount);
        });
    };

    // Observer for stats-section
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsCounted = false;

    if (statsSection && statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsCounted) {
                    animateCounters(statNumbers);
                    statsCounted = true;
                }
            });
        }, { threshold: 0.15 });

        statsObserver.observe(statsSection);
    }

    // Observer for why-choose-us-section
    const whyChooseSection = document.querySelector('.why-choose-us-section');
    const statBoxNumbers = document.querySelectorAll('.stat-box-number');
    let whyChooseCounted = false;

    if (whyChooseSection && statBoxNumbers.length > 0) {
        const whyChooseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !whyChooseCounted) {
                    animateCounters(statBoxNumbers);
                    whyChooseCounted = true;
                }
            });
        }, { threshold: 0.15 });

        whyChooseObserver.observe(whyChooseSection);
    }

    // 9. Interactive FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Collapse other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 10. Real Lead Form Submission (FormSubmit.co to icaasset@gmail.com)
    const consultationForm = document.getElementById('consultationForm');
    const formStatusMsg = document.getElementById('formStatusMsg');

    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('formName').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const phone = document.getElementById('formPhone').value.trim();
            const location = document.getElementById('formLocation').value;
            const message = document.getElementById('formMessage').value.trim();

            if (!name || !email || !phone || !location || !message) {
                formStatusMsg.className = 'form-status-msg error';
                formStatusMsg.textContent = 'Please fill out all required fields.';
                return;
            }

            formStatusMsg.className = 'form-status-msg';
            formStatusMsg.style.color = 'var(--primary-gold)';
            formStatusMsg.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting your inquiry...';

            // Submit lead to FormSubmit AJAX API
            fetch("https://formsubmit.co/ajax/icaasset@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    Name: name,
                    Email: email,
                    Phone: phone,
                    Location: location,
                    Requirements: message,
                    _subject: "New Property Lead from ICA Asset Management"
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success === "true" || data.success === true) {
                    formStatusMsg.className = 'form-status-msg success';
                    formStatusMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Inquiry submitted successfully! Our coordinator will connect with you via phone/WhatsApp shortly.';
                    consultationForm.reset();
                } else {
                    formStatusMsg.className = 'form-status-msg error';
                    formStatusMsg.textContent = 'Submission failed. Please try again or email us directly.';
                }
            })
            .catch(error => {
                formStatusMsg.className = 'form-status-msg error';
                formStatusMsg.textContent = 'Network error. Please check your connection and try again.';
            });
        });
    }

    // 11. Navigation Scroll Spy
    const sections = document.querySelectorAll('section');
    const scrollSpy = () => {
        const scrollPosition = window.scrollY + 120; // Account for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
});
