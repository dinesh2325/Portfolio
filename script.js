// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Loading Screen Animation
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">
                <span class="logo-text">DKP</span>
            </div>
            <div class="loading-spinner"></div>
            <p class="loading-text">Loading Portfolio...</p>
            <div class="loading-progress">
                <div class="progress-fill"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Simulate loading progress
    const progressFill = loadingScreen.querySelector('.progress-fill');
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        progressFill.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(loadingScreen);
                }, 500);
            }, 500);
        }
    }, 100);
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.style.transform = hamburger.classList.contains('active') 
            ? `rotate(${index === 0 ? 45 : index === 1 ? 0 : -45}deg) translate(${index === 0 ? 6 : index === 1 ? 20 : 6}px, ${index === 0 ? 6 : index === 1 ? 0 : -6}px)`
            : 'none';
        bar.style.opacity = hamburger.classList.contains('active') && index === 1 ? '0' : '1';
    });
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        
        // Reset hamburger bars
        const bars = hamburger?.querySelectorAll('.bar');
        bars?.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Enhanced Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change and active link highlighting on scroll
window.addEventListener('scroll', throttle(() => {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    // Navbar background
    if (scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    // Active navigation link highlighting
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 10));

// Enhanced Typewriter Effect for Hero Subtitle
function typeWriter() {
    const textElement = document.querySelector('.hero-subtitle');
    if (!textElement) return;
    
    const texts = [
        'Software Engineer & Full Stack Developer',
        'Problem Solver & System Designer', 
        'Golang & JavaScript Enthusiast',
        'Building Scalable Solutions',
        'DevRev MTS Intern',
        'LeetCode Knight 🏆'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 200;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            delay = 50;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            delay = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            delay = 500;
        }
        
        setTimeout(type, delay);
    }
    
    setTimeout(type, 1000);
}

// Enhanced Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-target'));
                const isDecimal = target % 1 !== 0;
                
                animateCounter(counter, 0, target, 2000, isDecimal);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, start, end, duration, isDecimal = false) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOutQuart;
        
        if (isDecimal) {
            element.textContent = current.toFixed(2);
        } else {
            element.textContent = Math.floor(current);
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = isDecimal ? end.toFixed(2) : end;
        }
    }
    
    requestAnimationFrame(update);
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 500);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Enhanced Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Floating label animation
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    // Add form interaction classes to prevent smooth scrolling
    const addFormInteractionClass = () => {
        document.documentElement.classList.add('form-interaction');
        document.body.classList.add('form-interaction');
    };
    
    const removeFormInteractionClass = () => {
        document.documentElement.classList.remove('form-interaction');
        document.body.classList.remove('form-interaction');
    };
    
    // Prevent scroll on focus for all form elements
    inputs.forEach(input => {
        // Enhanced floating label check function
        const checkInputValue = () => {
            if (input.value && input.value.trim() !== '') {
                input.parentElement.classList.add('focused');
            } else {
                input.parentElement.classList.remove('focused');
            }
        };
        
        // Prevent default scroll behavior on focus
        input.addEventListener('focus', (e) => {
            const currentScrollY = window.scrollY;
            addFormInteractionClass();
            
            input.parentElement.classList.add('focused');
            
            // Force maintain scroll position
            requestAnimationFrame(() => {
                window.scrollTo(0, currentScrollY);
            });
        });
        
        input.addEventListener('blur', () => {
            // Check if input has value before removing focused class
            checkInputValue();
            
            // Remove form interaction class after a delay
            setTimeout(() => {
                removeFormInteractionClass();
            }, 100);
        });

        // Enhanced input handling to maintain label position
        input.addEventListener('input', (e) => {
            const currentScrollY = window.scrollY;
            
            // Ensure label stays in correct position when typing
            checkInputValue();
            
            // Multiple attempts to maintain scroll position
            requestAnimationFrame(() => {
                window.scrollTo(0, currentScrollY);
            });
            
            setTimeout(() => {
                window.scrollTo(0, currentScrollY);
            }, 0);
        });

        // Additional protection for textarea
        if (input.tagName === 'TEXTAREA') {
            input.addEventListener('keypress', (e) => {
                const currentScrollY = window.scrollY;
                checkInputValue();
                requestAnimationFrame(() => {
                    window.scrollTo(0, currentScrollY);
                });
            });
            
            input.addEventListener('keyup', (e) => {
                const currentScrollY = window.scrollY;
                checkInputValue();
                requestAnimationFrame(() => {
                    window.scrollTo(0, currentScrollY);
                });
            });
        }

        // Prevent form submission on Enter key for inputs (except textarea)
        if (input.tagName !== 'TEXTAREA') {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const currentScrollY = window.scrollY;
                    
                    // Move to next input or submit if last input
                    const currentIndex = Array.from(inputs).indexOf(input);
                    if (currentIndex < inputs.length - 1) {
                        inputs[currentIndex + 1].focus();
                    } else {
                        contactForm.dispatchEvent(new Event('submit', { cancelable: true }));
                    }
                    
                    // Maintain scroll position
                    requestAnimationFrame(() => {
                        window.scrollTo(0, currentScrollY);
                    });
                }
            });
        } else {
            // Special handling for textarea to prevent unwanted scrolling
            input.addEventListener('keydown', (e) => {
                const currentScrollY = window.scrollY;
                
                // Allow normal textarea behavior but prevent page scrolling
                requestAnimationFrame(() => {
                    window.scrollTo(0, currentScrollY);
                });
            });
        }
        
        // Check if input has value on page load and set label position
        checkInputValue();
        
        // Additional check after a short delay in case values are set dynamically
        setTimeout(() => {
            checkInputValue();
        }, 100);
    });
    
    // Enhanced form submission with better scroll handling
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Lock scroll position during form submission
        const currentScrollY = window.scrollY;
        document.body.classList.add('form-submitting');
        document.body.style.position = 'fixed';
        document.body.style.top = `-${currentScrollY}px`;
        document.body.style.width = '100%';
        
        const submitBtn = this.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            shakeElement(submitBtn);
            
            // Restore scroll position
            document.body.classList.remove('form-submitting');
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, currentScrollY);
            return false;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            shakeElement(this.querySelector('#email'));
            
            // Restore scroll position
            document.body.classList.remove('form-submitting');
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, currentScrollY);
            return false;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.opacity = '0';
        btnIcon.style.opacity = '0';
        btnLoading.style.opacity = '1';
        
        try {
            // Simulate sending email (replace with actual email service)
            await sendContactMessage({ name, email, subject, message });
            
            // Success state
            btnLoading.style.opacity = '0';
            btnText.textContent = 'Message Sent!';
            btnIcon.innerHTML = '<i class="fas fa-check"></i>';
            btnText.style.opacity = '1';
            btnIcon.style.opacity = '1';
            
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            inputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
            
        } catch (error) {
            console.error('Error sending message:', error);
            btnLoading.style.opacity = '0';
            btnText.style.opacity = '1';
            btnIcon.style.opacity = '1';
            showNotification('Failed to send message. Please try again or contact me directly.', 'error');
        }
        
        // Restore scroll position
        document.body.classList.remove('form-submitting');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, currentScrollY);
        
        // Reset button after delay
        setTimeout(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
                btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
            }
        }, 3000);
        
        return false;
    });
    
    // Additional scroll prevention for the entire contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.addEventListener('scroll', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        
        // Prevent any scrolling within the contact section
        contactSection.addEventListener('wheel', (e) => {
            // Allow normal scrolling but prevent it from affecting form interactions
            if (document.querySelector('.floating-label input:focus, .floating-label textarea:focus')) {
                return;
            }
        });
    }
}

// Function to send contact message (you can integrate with EmailJS or other services)
async function sendContactMessage(data) {
    // Simulate API call - replace with actual email service
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // For now, just log the message and resolve
            console.log('Contact Message:', data);
            
            // You can integrate with EmailJS here:
            // emailjs.send('service_id', 'template_id', data)
            //   .then(resolve)
            //   .catch(reject);
            
            resolve();
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Shake animation for form validation
function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="${icons[type]}"></i>
            </div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Parallax Effect for Hero Section
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before, .floating-particles');
    
    parallaxElements.forEach(element => {
        const speed = element.classList.contains('floating-particles') ? 0.3 : 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Skills Animation on Scroll
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 50);
            }
        });
    }, { threshold: 0.1 });
    
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.9)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
    });
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.reveal-text, .animated-stat, .project-card, .achievement-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animateElements.forEach(element => observer.observe(element));
}

// Particle System Enhancement
function enhanceParticles() {
    const particles = document.querySelectorAll('.particle, .particle-small');
    
    particles.forEach((particle, index) => {
        particle.addEventListener('mouseenter', () => {
            particle.style.transform += ' scale(1.5)';
            particle.style.opacity = '0.3';
        });
        
        particle.addEventListener('mouseleave', () => {
            particle.style.transform = particle.style.transform.replace(' scale(1.5)', '');
            particle.style.opacity = '';
        });
    });
}

// Interactive Project Cards
function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 30px 60px rgba(102, 126, 234, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'h' to go to home
    if (e.key === 'h' && !e.ctrlKey && !e.altKey) {
        document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'c' to go to contact
    if (e.key === 'c' && !e.ctrlKey && !e.altKey) {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});

// Enhanced Mouse Trail Effect
let mouseTrail = [];
function createMouseTrail(e) {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    
    mouseTrail.push(trail);
    
    if (mouseTrail.length > 10) {
        const oldTrail = mouseTrail.shift();
        oldTrail.remove();
    }
    
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
    }, 100);
    
    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
    }, 500);
}

document.addEventListener('mousemove', throttle(createMouseTrail, 50));

// Easter Egg - Konami Code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    showNotification('🎉 Konami Code activated! Secret developer mode enabled!', 'success');
    
    // Add party mode
    document.body.classList.add('party-mode');
    
    // Rainbow animation
    document.body.style.animation = 'rainbow 3s ease-in-out';
    
    // Add floating emojis
    const emojis = ['🚀', '💻', '⚡', '🎯', '🔥', '💡', '🎊'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFloatingEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
        }, i * 200);
    }
    
    setTimeout(() => {
        document.body.style.animation = '';
        document.body.classList.remove('party-mode');
    }, 5000);
}

function createFloatingEmoji(emoji) {
    const emojiElement = document.createElement('div');
    emojiElement.className = 'floating-emoji';
    emojiElement.textContent = emoji;
    emojiElement.style.left = Math.random() * window.innerWidth + 'px';
    emojiElement.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(emojiElement);
    
    emojiElement.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: 3000,
        easing: 'ease-out'
    }).onfinish = () => {
        emojiElement.remove();
    };
}

// Enhanced Skill Progress Animation
function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');
                setTimeout(() => {
                    fill.style.width = width + '%';
                }, 300);
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.3 });
    
    skillFills.forEach(fill => observer.observe(fill));
}

// Experience Card Interactive Effects
function enhanceExperienceCards() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        // Add 3D tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

// Enhanced Project Card Interactions
function enhanceProjectInteractions() {
    const projectCards = document.querySelectorAll('.featured-project');
    
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        
        // Enhanced hover effects with mouse tracking
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            overlay.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(102, 126, 234, 0.3) 0%, rgba(10, 10, 10, 0.8) 70%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            overlay.style.background = 'linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(26, 26, 46, 0.9) 100%)';
        });
    });
}

// Achievement Card Glow Effects
function enhanceAchievementCards() {
    const achievementCards = document.querySelectorAll('.achievement-card-modern');
    
    achievementCards.forEach((card, index) => {
        // Staggered entrance animation
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Interactive glow effect
        card.addEventListener('mouseenter', () => {
            const medal = card.querySelector('.medal-circle');
            if (medal) {
                medal.style.boxShadow = '0 0 40px rgba(255, 215, 0, 0.8), 0 0 60px rgba(102, 126, 234, 0.4)';
                medal.style.transform = 'scale(1.1) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const medal = card.querySelector('.medal-circle');
            if (medal) {
                medal.style.boxShadow = '';
                medal.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Tech Bubble Interactive Effects
function enhanceTechBubbles() {
    const techBubbles = document.querySelectorAll('.tech-bubble, .tech-item');
    
    techBubbles.forEach(bubble => {
        bubble.addEventListener('click', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'tech-ripple';
            
            const rect = bubble.getBoundingClientRect();
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            
            bubble.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Floating animation on hover
        bubble.addEventListener('mouseenter', () => {
            bubble.style.animation = 'techFloat 0.6s ease-in-out infinite alternate';
        });
        
        bubble.addEventListener('mouseleave', () => {
            bubble.style.animation = '';
        });
    });
}

// Timeline Marker Progress Animation
function animateTimelineMarkers() {
    const markers = document.querySelectorAll('.timeline-marker');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('marker-animate');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    markers.forEach(marker => observer.observe(marker));
}

// Enhanced Section Transitions
function enhanceSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Trigger specific animations for each section
                const sectionId = entry.target.id;
                switch(sectionId) {
                    case 'skills':
                        animateSkillBars();
                        break;
                    case 'achievements':
                        enhanceAchievementCards();
                        break;
                    case 'experience':
                        animateTimelineMarkers();
                        break;
                }
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => observer.observe(section));
}

// Category Icon Interactions
function enhanceCategoryIcons() {
    const categoryIcons = document.querySelectorAll('.category-icon');
    
    categoryIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(10deg)';
            icon.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.6)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.boxShadow = '';
        });
    });
}

// Skill Card Hover Effects
function enhanceSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const logo = card.querySelector('.skill-logo');
        
        card.addEventListener('mouseenter', () => {
            if (logo) {
                logo.style.transform = 'scale(1.2) rotate(5deg)';
                logo.style.filter = 'drop-shadow(0 0 10px currentColor)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (logo) {
                logo.style.transform = 'scale(1) rotate(0deg)';
                logo.style.filter = '';
            }
        });
    });
}

// Achievement Stats Counter Animation
function animateAchievementStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                // Only animate if it's a number
                if (!isNaN(text) && text !== '') {
                    animateCounter(element, 0, parseInt(text), 1500);
                }
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Enhanced Scroll Progress Indicator
function addScrollProgress() {
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.innerHTML = '<div class="scroll-progress-bar"></div>';
    
    document.body.appendChild(scrollProgress);
    
    const progressBar = scrollProgress.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Interactive Background Elements
function addInteractiveBackground() {
    const backgrounds = document.querySelectorAll('.experience::before, .skills::before');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        backgrounds.forEach(bg => {
            bg.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        });
    });
}

// Initialize all enhanced functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio Loading...');
    
    // Auto-scroll to home section on page load
    setTimeout(() => {
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            homeSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
        // Ensure we're at the top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    
    // Show loading screen
    showLoadingScreen();
    
    // Initialize all animations and effects
    setTimeout(() => {
        typeWriter();
        animateCounters();
        animateProgressBars();
        animateSkills();
        initScrollAnimations();
        enhanceParticles();
        enhanceProjectCards();
        
        // New enhanced functions
        enhanceExperienceCards();
        enhanceProjectInteractions();
        enhanceTechBubbles();
        enhanceSectionTransitions();
        enhanceCategoryIcons();
        enhanceSkillCards();
        animateAchievementStats();
        addScrollProgress();
        addInteractiveBackground();
        
        console.log('✨ Portfolio loaded successfully!');
        console.log('💡 Tip: Try the Konami code for a surprise!');
        console.log('⌨️  Keyboard shortcuts: H (Home), C (Contact)');
    }, 1000);
});

// Add window load event for additional initialization
window.addEventListener('load', function() {
    // Ensure we start at home after everything is loaded
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, 200);
    
    // Performance monitoring
    performanceMetrics.loadTime = performance.now();
    console.log(`⚡ Page loaded in ${performanceMetrics.loadTime.toFixed(2)}ms`);
});

// Prevent form submission issues on page refresh
window.addEventListener('beforeunload', function() {
    // Clear any form data to prevent issues on reload
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        if (form.id === 'contactForm') {
            form.reset();
        }
    });
});

// Handle browser back/forward navigation
window.addEventListener('popstate', function(event) {
    // If navigating back to home, scroll to top
    if (window.location.hash === '' || window.location.hash === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Add parallax scroll listener
window.addEventListener('scroll', throttle(handleParallax, 10));

// Performance monitoring
let performanceMetrics = {
    loadTime: 0,
    scrollEvents: 0,
    interactions: 0
};

// Track user interactions
document.addEventListener('click', () => {
    performanceMetrics.interactions++;
});

document.addEventListener('scroll', () => {
    performanceMetrics.scrollEvents++;
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 