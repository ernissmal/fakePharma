/**
 * NeoHealth Pharmaceuticals - Main JavaScript
 * Animations, interactivity, and responsive functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll library)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // DOM elements
    const header = document.querySelector('header');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const cursorFollower = document.querySelector('.cursor-follower');
    const allLinks = document.querySelectorAll('a');
    const allButtons = document.querySelectorAll('button');

    // Scroll events
    window.addEventListener('scroll', function() {
        // Header shadow and background on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Enhanced pill-shaped cursor follower effect for desktop only
    if (window.innerWidth > 900) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Show the cursor follower if it's hidden
            if (cursorFollower.style.display !== 'block') {
                cursorFollower.style.display = 'block';
            }
        });
        
        // Smooth cursor movement with animation frame
        function animateCursor() {
            // Calculate smooth movement with easing
            const easeFactor = 0.15;
            cursorX += (mouseX - cursorX) * easeFactor;
            cursorY += (mouseY - cursorY) * easeFactor;
            
            // Apply positions with transform for better performance
            cursorFollower.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
            
            requestAnimationFrame(animateCursor);
        }
        
        // Start cursor animation
        animateCursor();

        // Enhanced hover effects for interactive elements with pill shape adjustments
        [...allLinks, ...allButtons].forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorFollower.style.width = '60px';
                cursorFollower.style.height = '24px';
                cursorFollower.style.backgroundColor = 'rgba(33, 150, 243, 0.2)';
                cursorFollower.style.boxShadow = '0 0 15px rgba(33, 150, 243, 0.4)';
            });

            element.addEventListener('mouseleave', () => {
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '20px';
                cursorFollower.style.backgroundColor = 'rgba(33, 150, 243, 0.15)';
                cursorFollower.style.boxShadow = '0 0 10px rgba(33, 150, 243, 0.2)';
            });
        });
        
        // Different cursor effects for different element types
        const floatingPills = document.querySelectorAll('.floating-pill');
        floatingPills.forEach(pill => {
            pill.addEventListener('mouseenter', () => {
                // Extract background color from the pill
                const computedStyle = window.getComputedStyle(pill);
                const bgColor = computedStyle.backgroundImage || computedStyle.backgroundColor;
                
                // Show a capsule-like cursor that matches the pill color
                cursorFollower.style.width = '50px';
                cursorFollower.style.height = '22px';
                cursorFollower.style.backgroundColor = 'transparent';
                cursorFollower.style.border = '2px solid rgba(255, 255, 255, 0.7)';
                cursorFollower.style.boxShadow = '0 0 20px rgba(156, 39, 176, 0.5)';
            });
            
            pill.addEventListener('mouseleave', () => {
                // Reset to default cursor
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '20px';
                cursorFollower.style.backgroundColor = 'rgba(33, 150, 243, 0.15)';
                cursorFollower.style.border = 'none';
                cursorFollower.style.boxShadow = '0 0 10px rgba(33, 150, 243, 0.2)';
            });
        });
        
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                cursorFollower.style.width = '70px';
                cursorFollower.style.height = '30px';
                cursorFollower.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
                cursorFollower.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.4)';
            });
            
            card.addEventListener('mouseleave', () => {
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '20px';
                cursorFollower.style.backgroundColor = 'rgba(33, 150, 243, 0.15)';
                cursorFollower.style.boxShadow = '0 0 10px rgba(33, 150, 243, 0.2)';
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the target element
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Calculate header height to adjust scroll position
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Scroll to the target
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll-triggered animations for elements not using AOS
    const animateOnScroll = () => {
        const scrollElements = document.querySelectorAll('.scroll-animation');
        
        scrollElements.forEach(element => {
            let elementPosition = element.getBoundingClientRect().top;
            let screenPosition = window.innerHeight;
            
            if(elementPosition < screenPosition - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                subject: this.querySelector('#subject').value,
                message: this.querySelector('#message').value
            };

            // In a real application, you would send this data to a server
            console.log('Form submitted:', formData);
            
            // Show success message (for demo only)
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Message Sent!';
            submitButton.classList.add('success');
            submitButton.disabled = true;
            
            // Reset form after delay
            setTimeout(() => {
                this.reset();
                submitButton.textContent = originalText;
                submitButton.classList.remove('success');
                submitButton.disabled = false;
                
                // Show toast notification
                showToast('Your message has been sent successfully!');
            }, 2000);
        });
    }

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // In a real application, you would send this data to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Subscribed!';
            submitButton.classList.add('success');
            
            // Reset form after delay
            setTimeout(() => {
                this.reset();
                submitButton.textContent = originalText;
                submitButton.classList.remove('success');
                
                // Show toast notification
                showToast('You have successfully subscribed to our newsletter!');
            }, 2000);
        });
    }

    // Toast notification function
    function showToast(message) {
        // Create toast element if it doesn't exist
        if (!document.querySelector('.toast')) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        
        const toast = document.querySelector('.toast');
        toast.textContent = message;
        toast.classList.add('show');
        
        // Hide toast after delay
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    // Add CSS for toast notifications
    if (!document.querySelector('#toast-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'toast-styles';
        styleSheet.textContent = `
            .toast {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background-color: var(--primary);
                color: white;
                padding: 12px 24px;
                border-radius: var(--border-radius-pill);
                font-size: 16px;
                box-shadow: var(--shadow-md);
                z-index: 9999;
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            .toast.show {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            
            .success {
                background: var(--accent-green) !important;
                color: white !important;
            }
        `;
        document.head.appendChild(styleSheet);
    }

    // Add some color-changing effects to the pills for more visual interest
    const addPillColorEffects = () => {
        const pills = document.querySelectorAll('.floating-pill');
        
        pills.forEach((pill, index) => {
            // Create a random interval between 5 and 10 seconds
            const interval = (5 + Math.random() * 5) * 1000;
            
            // Change colors periodically
            setInterval(() => {
                const colors = [
                    'rgba(33, 150, 243, 0.6)',  // Blue
                    'rgba(156, 39, 176, 0.6)',  // Purple
                    'rgba(76, 175, 80, 0.6)',   // Green
                    'rgba(233, 30, 99, 0.6)'    // Pink
                ];
                
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                pill.style.background = randomColor;
                pill.style.boxShadow = `0 8px 32px 0 ${randomColor.replace('0.6', '0.3')}`;
                
            }, interval);
        });
    };
    
    addPillColorEffects();

    // Product card hover effect to simulate 3D tilting
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth <= 900) return; // Only for desktop
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const dx = x - xc;
            const dy = y - yc;
            
            // Limit the tilt angle
            const tiltX = dy / 20;
            const tiltY = -dx / 20;
            
            card.style.transform = `translateY(-10px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                card.style.transform = '';
            }, 300);
        });
    });

    // Initialize the page to handle window resize events
    window.addEventListener('resize', function() {
        // Handle cursor follower visibility based on screen size
        if (window.innerWidth <= 900) {
            if (cursorFollower) cursorFollower.style.display = 'none';
        }
        
        // Close mobile menu when resizing to larger screens
        if (window.innerWidth > 900) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            }
        }
    });
});