// Fixed typing effect - cursor at the end
function typeWriter() {
    const text = "I build AI systems that see, think, and protect";
    let index = 0;
    const typedTextElement = document.getElementById('typewriter-text');
    
    // Ensure element starts empty
    if (typedTextElement) {
        typedTextElement.textContent = "";
    }
    
    function typeCharacter() {
        if (index < text.length && typedTextElement) {
            typedTextElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, 80);
        }
        // Cursor will automatically blink at the end due to HTML structure
    }
    
    // Start typing after 300ms delay
    setTimeout(typeCharacter, 300);
}

// Advanced Intersection Observer with cascade animations
function observeElements() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const morphObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add ripple effect for interactive elements
                if (entry.target.classList.contains('interactive-element')) {
                    setTimeout(() => {
                        createRippleEffect(entry.target);
                    }, 300);
                }
                
                morphObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const cascadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cascade animation for grouped elements
                const parent = entry.target;
                const children = parent.querySelectorAll('.story-card, .stat-widget, .project-card, .timeline-item, .skill-item');
                
                children.forEach((child, index) => {
                    child.classList.add(`stagger-${Math.min(index + 1, 5)}`);
                    child.classList.add('cascade-in');
                });
                
                cascadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for cascade effect
    const sections = document.querySelectorAll('.about-section, .projects-section, .certifications-section, .experience-section, .skills-section');
    sections.forEach(section => {
        cascadeObserver.observe(section);
    });
    
    // Observe individual elements for morph animation
    const elementsToObserve = [
        '.contact-content',
        '.timeline-container',
        '.fun-facts-carousel',
        '.certifications-grid',
        '.training-stats'
    ];
    
    elementsToObserve.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            morphObserver.observe(element);
        });
    });
}

// Smooth scrolling for internal links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Enhanced scroll indicator with glass effects
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Enhanced scroll indicator with parallax
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollPosition = window.pageYOffset;
                    const opacity = Math.max(0, 1 - (scrollPosition / 300));
                    const blur = Math.min(12, scrollPosition / 20);
                    
                    scrollIndicator.style.opacity = opacity;
                    scrollIndicator.style.filter = `blur(${blur}px)`;
                    scrollIndicator.style.transform = `translateY(${scrollPosition * 0.3}px)`;
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// Advanced parallax with glass depth layers
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-bg-animation');
    const heroContent = document.querySelector('.hero-content');
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    if (heroBackground) {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollPosition = window.pageYOffset;
                    
                    // Background parallax
                    heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
                    
                    // Hero content depth
                    if (heroContent) {
                        const blur = Math.min(8, scrollPosition / 50);
                        heroContent.style.filter = `blur(${blur}px)`;
                        heroContent.style.transform = `translateY(${scrollPosition * 0.2}px) scale(${1 - scrollPosition / 2000})`;
                    }
                    
                    // Floating shapes multi-layer parallax
                    floatingShapes.forEach((shape, index) => {
                        const speed = 0.3 + (index * 0.1);
                        const rotation = scrollPosition / (10 + index * 5);
                        shape.style.transform = `translateY(${scrollPosition * speed}px) rotate(${rotation}deg)`;
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// Advanced project cards with 3D parallax and ripple effects
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const primaryBtn = card.querySelector('.project-btn.primary');
        const secondaryBtn = card.querySelector('.project-btn.secondary');
        const accentColor = card.getAttribute('data-accent');
        const projectData = card.getAttribute('data-project');
        
        // 3D hover effects with enhanced glassmorphism
        card.addEventListener('mouseenter', () => {
            if (accentColor && primaryBtn) {
                primaryBtn.style.background = `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`;
                primaryBtn.style.boxShadow = `0 12px 40px ${accentColor}50, 0 0 0 1px ${accentColor}30`;
            }
            
            // Dynamic glass tinting
            card.style.background = `linear-gradient(135deg, ${accentColor}12 0%, rgba(255, 255, 255, 0.08) 50%, ${accentColor}08 100%)`;
            card.style.borderColor = `${accentColor}60`;
        });
        
        card.addEventListener('mouseleave', () => {
            if (primaryBtn) {
                primaryBtn.style.background = '';
                primaryBtn.style.boxShadow = '';
            }
            card.style.background = '';
            card.style.borderColor = '';
            card.style.transform = '';
        });
        
        // Enhanced project modals with detailed content
        if (primaryBtn) {
            primaryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                createProjectModal(projectData, card);
            });
        }
        
        if (secondaryBtn) {
            secondaryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const githubUrl = getGithubUrl(projectData);
                if (githubUrl !== '#') {
                    window.open(githubUrl, '_blank');
                } else {
                    createGlassModal('GitHub Repository', 'This project\'s source code would be available on GitHub in a full implementation.');
                }
            });
        }
        
        // 3D parallax tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
            
            card.style.transform = `
                translateY(-12px) scale(1.02) 
                perspective(1000px) 
                rotateX(${-y}deg) 
                rotateY(${x}deg)
            `;
        });
        
        // Ripple effect on click
        card.addEventListener('click', (e) => {
            createRippleEffect(card, e.clientX - card.getBoundingClientRect().left, e.clientY - card.getBoundingClientRect().top);
        });
    });
}

// Skill tag interactions
function initSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            // Add a subtle glow effect
            tag.style.transform = 'scale(1.05) translateY(-2px)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1) translateY(0)';
        });
    });
}

// Social links analytics (for demonstration)
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link, .contact-btn');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const linkType = link.getAttribute('aria-label') || link.textContent.trim();
            console.log(`Social link clicked: ${linkType}`);
            
            // Add a subtle feedback effect
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = '';
            }, 150);
        });
    });
}

// Performance optimization for scroll events
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

// Navigation highlighting based on scroll position
function initScrollNavigation() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    const updateActiveSection = throttle(() => {
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update any navigation highlighting here if you add a navigation menu
        console.log('Current section:', currentSection);
    }, 100);
    
    window.addEventListener('scroll', updateActiveSection);
}

// Enhanced loading animations
function initLoadingAnimations() {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class and start animations when page is loaded
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
        
        // Typing will be started by splash screen
        // typeWriter(); - now handled by splash screen
    });
}

// Accessibility enhancements
function initAccessibility() {
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.project-btn, .social-link, .contact-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-normal', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    }
}

// Utility Functions
function createRippleEffect(element, x, y) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        top: ${(y || rect.height / 2) - size / 2}px;
        left: ${(x || rect.width / 2) - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(0, 217, 255, 0.4) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleExpand 0.8s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 800);
}

function getGithubUrl(projectData) {
    const urls = {
        'sentinelx': 'https://github.com/Jatin-code16/sentinelx',
        'rungtai': 'https://github.com/Jatin-code16/rungtai',
        'evoting': 'https://github.com/Jatin-code16/e-voting'
    };
    return urls[projectData] || '#';
}

function createProjectModal(projectData, card) {
    const projects = {
        'sentinelx': {
            title: 'SentinelX - AI-Powered Surveillance System',
            description: 'Real-time crime detection AI using YOLOv11/OpenCV, live video analytics, instant Telegram alerts, Flask dashboard. Prioritized event queue and robust notification workflow for urban safety.',
            features: [
                '95% accuracy in crime detection',
                'Real-time video processing',
                'Instant Telegram notifications',
                'Flask dashboard monitoring',
                'Event prioritization system'
            ],
            challenges: [
                'Model accuracy in low-light conditions',
                'Latency optimization for edge devices',
                'User privacy compliance',
                'False positive reduction'
            ],
            techStack: ['YOLOv11', 'OpenCV', 'Python', 'Flask', 'Telegram Bot API'],
            achievements: ['1st Place Project Competition 2025', '2nd Best Paper Award - Shashtrarth 2025']
        },
        'rungtai': {
            title: 'RungtAI - Campus AI Companion',
            description: 'Interactive AI agent for campus info/accessibility. Delivers academic info, services, live updates using NLP/ML. Privacy-focused with scalable architecture.',
            features: [
                '500+ active users',
                '90% user satisfaction',
                '24/7 availability',
                'Multi-language support',
                'Real-time campus updates'
            ],
            challenges: [
                'Natural language understanding',
                'Scalable backend architecture',
                'Dynamic content integration',
                'User privacy protection'
            ],
            techStack: ['Python', 'AI/ML', 'NLP', 'Chatbot Framework'],
            achievements: ['Deployed campus-wide', 'Positive student feedback']
        },
        'evoting': {
            title: 'Biometric E-Voting System',
            description: 'Secure Python-based voting with face recognition authentication. Prevents duplicate/fake votes using ML for tamper-proof logs and improved ballot integrity.',
            features: [
                '99.9% security rate',
                'Zero fraud incidents',
                'Sub-second authentication',
                'Biometric verification',
                'Tamper-proof logging'
            ],
            challenges: [
                'Facial spoofing prevention',
                'Real-time user validation',
                'Regulatory compliance',
                'UX accessibility'
            ],
            techStack: ['Python', 'OpenCV', 'Face Recognition', 'Machine Learning'],
            achievements: ['Security audit passed', 'Regulatory compliant']
        }
    };
    
    const project = projects[projectData];
    if (!project) return;
    
    const modalContent = `
        <div class="project-modal-content">
            <div class="modal-header">
                <h2>${project.title}</h2>
                <p>${project.description}</p>
            </div>
            
            <div class="modal-tabs">
                <button class="modal-tab active" data-tab="features">Features</button>
                <button class="modal-tab" data-tab="challenges">Challenges</button>
                <button class="modal-tab" data-tab="tech">Tech Stack</button>
                <button class="modal-tab" data-tab="achievements">Achievements</button>
            </div>
            
            <div class="modal-tab-content active" data-content="features">
                <h3>🚀 Key Features</h3>
                <ul>${project.features.map(f => `<li>${f}</li>`).join('')}</ul>
            </div>
            
            <div class="modal-tab-content" data-content="challenges">
                <h3>⚡ Challenges Solved</h3>
                <ul>${project.challenges.map(c => `<li>${c}</li>`).join('')}</ul>
            </div>
            
            <div class="modal-tab-content" data-content="tech">
                <h3>🛠️ Technology Stack</h3>
                <div class="tech-grid">
                    ${project.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-tab-content" data-content="achievements">
                <h3>🏆 Achievements</h3>
                <ul>${project.achievements.map(a => `<li>${a}</li>`).join('')}</ul>
            </div>
            
            <div class="modal-actions">
                <button class="modal-btn primary" onclick="window.open('${getGithubUrl(projectData)}', '_blank')">View Code</button>
                <button class="modal-btn secondary modal-close">Close</button>
            </div>
        </div>
    `;
    
    createAdvancedModal(modalContent);
}

function createAdvancedModal(content) {
    const modal = document.createElement('div');
    modal.className = 'advanced-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 22, 40, 0.9);
        backdrop-filter: blur(16px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.4s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px) saturate(180%);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 24px;
        padding: 2rem;
        max-width: 700px;
        max-height: 80vh;
        overflow-y: auto;
        color: white;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        transform: scale(0.8) translateY(30px);
        transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
    `;
    
    modalContent.innerHTML = content;
    
    // Tab functionality
    const tabs = modalContent.querySelectorAll('.modal-tab');
    const contents = modalContent.querySelectorAll('.modal-tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetContent = tab.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            modalContent.querySelector(`[data-content="${targetContent}"]`).classList.add('active');
        });
    });
    
    const closeBtn = modalContent.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8) translateY(30px)';
            setTimeout(() => modal.remove(), 400);
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn?.click();
        }
    });
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1) translateY(0)';
    }, 10);
    
    // Add styles for modal components
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .project-modal-content { line-height: 1.6; }
        .modal-header h2 { color: #00D9FF; margin-bottom: 1rem; text-shadow: 0 0 10px rgba(0, 217, 255, 0.3); }
        .modal-tabs { display: flex; gap: 1rem; margin: 1.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .modal-tab { background: none; border: none; color: rgba(255,255,255,0.6); padding: 0.5rem 1rem; cursor: pointer; border-radius: 8px 8px 0 0; transition: all 0.3s ease; }
        .modal-tab.active { color: #00D9FF; background: rgba(0,217,255,0.1); }
        .modal-tab-content { display: none; margin: 1.5rem 0; }
        .modal-tab-content.active { display: block; animation: fadeInUp 0.3s ease; }
        .modal-tab-content h3 { color: #00D9FF; margin-bottom: 1rem; }
        .modal-tab-content ul { padding-left: 1.5rem; }
        .modal-tab-content li { margin-bottom: 0.5rem; color: rgba(255,255,255,0.8); }
        .tech-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .tech-badge { background: rgba(0,217,255,0.2); color: #00D9FF; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem; border: 1px solid rgba(0,217,255,0.3); }
        .modal-actions { display: flex; gap: 1rem; margin-top: 2rem; }
        .modal-btn { padding: 0.75rem 2rem; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; border: none; }
        .modal-btn.primary { background: linear-gradient(135deg, #00D9FF 0%, #00F0FF 100%); color: #0A1628; }
        .modal-btn.secondary { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); }
        .modal-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(modalStyles);
}

// Glass modal utility function
function createGlassModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'glass-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 22, 40, 0.8);
        backdrop-filter: blur(12px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        text-align: center;
        color: white;
        box-shadow: 0 16px 64px rgba(0, 0, 0, 0.2);
        transform: scale(0.8) translateY(20px);
        transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    `;
    
    modalContent.innerHTML = `
        <h3 style="color: var(--electric-cyan); margin-bottom: 1rem; text-shadow: 0 0 10px rgba(0, 217, 255, 0.3);">${title}</h3>
        <p style="margin-bottom: 1.5rem; line-height: 1.6; opacity: 0.9;">${content}</p>
        <button class="glass-close-btn" style="
            background: linear-gradient(135deg, var(--electric-cyan) 0%, var(--bright-cyan) 100%);
            color: var(--primary-navy);
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            backdrop-filter: blur(8px);
            transition: all 0.2s ease;
        ">Close</button>
    `;
    
    const closeBtn = modalContent.querySelector('.glass-close-btn');
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8) translateY(20px)';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1) translateY(0)';
    }, 10);
}

// Particle system for hero section
function initParticleSystem() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const particleCount = 20;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${1 + Math.random() * 3}px;
            height: ${1 + Math.random() * 3}px;
            background: rgba(0, 217, 255, ${0.3 + Math.random() * 0.7});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: 100%;
            box-shadow: 0 0 ${2 + Math.random() * 4}px rgba(0, 217, 255, 0.8);
            animation: particleFloat ${8 + Math.random() * 4}s linear infinite;
            animation-delay: ${Math.random() * 8}s;
        `;
        
        heroSection.appendChild(particle);
        particles.push(particle);
    }
    
    // Add some larger glowing orbs
    for (let i = 0; i < 5; i++) {
        const orb = document.createElement('div');
        orb.className = 'particle orb';
        orb.style.cssText = `
            position: absolute;
            width: ${10 + Math.random() * 20}px;
            height: ${10 + Math.random() * 20}px;
            background: radial-gradient(circle, rgba(0, 217, 255, 0.4) 0%, transparent 70%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: orbFloat ${15 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 10}s;
        `;
        
        heroSection.appendChild(orb);
    }
}

// Enhanced glassmorphism interactions
function initGlassmorphismEffects() {
    // Add mouse tracking for glass panels
    const glassPanels = document.querySelectorAll('.glass-panel, .glass-panel-strong, .hero-content, .contact-content');
    
    glassPanels.forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5);
            const y = ((e.clientY - rect.top) / rect.height - 0.5);
            
            // Subtle tilt effect
            const tiltX = y * 5;
            const tiltY = x * 5;
            
            panel.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
        });
        
        panel.addEventListener('mouseleave', () => {
            panel.style.transform = '';
        });
    });
    
    // Enhanced skill tags with glass refraction
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.addEventListener('mouseenter', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(0, 217, 255, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            tag.style.position = 'relative';
            tag.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Context Bar (Origin Island Style)
function initContextBar() {
    const contextBar = document.getElementById('contextBar');
    const contextText = contextBar.querySelector('.context-text');
    const contextIcon = contextBar.querySelector('.context-icon');
    
    const contexts = [
        { icon: '🚀', text: 'Welcome to my AI journey' },
        { icon: '🧠', text: 'Exploring innovative solutions' },
        { icon: '🔬', text: 'Building the future with AI' },
        { icon: '🌟', text: 'Passionate about technology' },
        { icon: '🎯', text: 'Focused on real-world impact' }
    ];
    
    let currentContext = 0;
    
    function updateContext() {
        contextIcon.textContent = contexts[currentContext].icon;
        contextText.textContent = contexts[currentContext].text;
        currentContext = (currentContext + 1) % contexts.length;
    }
    
    // Show context bar after page load
    setTimeout(() => {
        contextBar.classList.add('show');
        updateContext();
    }, 1000);
    
    // Change context based on scroll position
    let lastScrollY = 0;
    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.pageYOffset;
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                const sectionContexts = {
                    'hero': { icon: '🚀', text: 'Welcome to my AI journey' },
                    'about': { icon: '👨‍💻', text: 'Getting to know me' },
                    'projects': { icon: '🛠️', text: 'Exploring my projects' },
                    'certifications': { icon: '🎓', text: 'Professional credentials' },
                    'experience': { icon: '🏆', text: 'My achievements' },
                    'skills': { icon: '⚡', text: 'Technical expertise' },
                    'contact': { icon: '📬', text: 'Let\'s connect!' }
                };
                
                const sectionId = section.getAttribute('id');
                const context = sectionContexts[sectionId];
                if (context) {
                    contextIcon.textContent = context.icon;
                    contextText.textContent = context.text;
                }
            }
        });
        
        lastScrollY = scrollY;
    }, 100));
}

// Fun Facts Carousel
function initFunFactsCarousel() {
    const facts = document.querySelectorAll('.fun-fact');
    const dots = document.querySelector('.carousel-dots');
    let currentFact = 0;
    
    // Create dots
    facts.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToFact(index));
        dots.appendChild(dot);
    });
    
    function goToFact(index) {
        facts[currentFact].classList.remove('active');
        dots.children[currentFact].classList.remove('active');
        
        currentFact = index;
        facts[currentFact].classList.add('active');
        dots.children[currentFact].classList.add('active');
    }
    
    // Auto-advance carousel
    setInterval(() => {
        const nextFact = (currentFact + 1) % facts.length;
        goToFact(nextFact);
    }, 4000);
}

// Animated Counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.animated-counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-value'));
                const duration = 2000;
                const startTime = Date.now();
                const startValue = 0;
                
                function updateCounter() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const currentValue = startValue + (target - startValue) * easeOutQuart;
                    
                    if (target % 1 === 0) {
                        counter.textContent = Math.round(currentValue);
                    } else {
                        counter.textContent = currentValue.toFixed(1);
                    }
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Progress Bar Animations
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = `${progress}%`;
                }, 300);
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => progressObserver.observe(bar));
}

// Progress Rings Animation
function initProgressRings() {
    const rings = document.querySelectorAll('.progress-ring');
    
    const ringObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ring = entry.target;
                const progress = ring.getAttribute('data-progress');
                const circle = ring.querySelector('.progress-ring-circle');
                const radius = 20;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (progress / 100) * circumference;
                
                circle.style.strokeDashoffset = offset;
                ringObserver.unobserve(ring);
            }
        });
    }, { threshold: 0.5 });
    
    rings.forEach(ring => ringObserver.observe(ring));
}

// Multi-step Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    const steps = form.querySelectorAll('.form-step');
    const progressDots = form.querySelectorAll('.progress-dot');
    const nextBtns = form.querySelectorAll('.next-btn');
    const prevBtns = form.querySelectorAll('.prev-btn');
    let currentStep = 0;
    
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        
        progressDots.forEach((dot, index) => {
            dot.classList.toggle('active', index <= stepIndex);
        });
    }
    
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });
    
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });
    
    // Enhanced input animations
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        input.addEventListener('input', () => {
            const ripple = input.parentElement.querySelector('.input-ripple');
            ripple.style.width = '100%';
            setTimeout(() => {
                ripple.style.width = '0';
            }, 300);
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.textContent = 'Sending... 🚀';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            createGlassModal('Message Sent! 🎉', 'Thank you for reaching out! I\'ll get back to you as soon as possible.');
            form.reset();
            currentStep = 0;
            showStep(currentStep);
            submitBtn.textContent = 'Send Message 🚀';
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Quick Action Buttons
function initQuickActions() {
    const quickBtns = document.querySelectorAll('.quick-btn');
    
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            const responses = {
                'portfolio': 'You\'re already exploring my portfolio! Feel free to scroll through my projects and experience.',
                'resume': 'My resume would be available as a PDF download in a full implementation. It includes detailed information about my education, projects, and technical skills.',
                'calendar': 'Calendar integration would be available in a full implementation. You can reach out via email or LinkedIn to schedule a meeting!'
            };
            
            createGlassModal(`${action.charAt(0).toUpperCase() + action.slice(1)} 📋`, responses[action]);
        });
    });
}

// Mobile nav toggle
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (!navToggle || !navMenu) return;

    const toggle = () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };

    navToggle.addEventListener('click', toggle);

    // Close on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) toggle();
        });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) toggle();
    });
}

// Certifications functionality
function initCertifications() {
    const certificationCards = document.querySelectorAll('.certification-card');
    
    certificationCards.forEach(card => {
        const primaryBtn = card.querySelector('.cert-btn.primary');
        const secondaryBtn = card.querySelector('.cert-btn.secondary');
        const certType = card.getAttribute('data-cert');
        
        // Certificate modal content
        const certData = {
            'ai-ml': {
                title: 'AI-ML Virtual Internship Certificate',
                content: 'This comprehensive 10-week program provided hands-on experience in machine learning model development, AI ethics, and practical implementation of intelligent systems. The curriculum covered deep learning architectures, computer vision applications, and industry best practices for AI deployment.'
            },
            'astronomy': {
                title: 'Summer School in Astronomy & Astrophysics Certificate',
                content: 'An intensive 120-hour program focusing on data-driven astronomy, computational astrophysics, and modern space science methodologies. Gained expertise in astronomical data processing, cosmic phenomena analysis, and research techniques used in space exploration.'
            },
            'future': {
                title: 'Planned Certifications Roadmap',
                content: 'Future learning path includes advanced deep learning specialization, computer vision mastery, and AI research methodologies. Planning to pursue certifications in neural architecture search, generative AI models, and ethical AI development practices.'
            }
        };
        
        if (primaryBtn) {
            primaryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const cert = certData[certType];
                if (cert) {
                    createGlassModal(cert.title, cert.content);
                } else {
                    createGlassModal('Certificate', 'Certificate details would be available in a full implementation.');
                }
            });
        }
        
        if (secondaryBtn) {
            secondaryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (certType === 'future') {
                    createGlassModal('Learning Roadmap', 'My continuous learning journey includes staying updated with the latest AI research, pursuing advanced certifications, and contributing to open-source projects. I believe in lifelong learning to keep pace with the rapidly evolving field of artificial intelligence.');
                } else {
                    createGlassModal('Learn More', 'Detailed information about this certification, including curriculum, projects completed, and skills gained would be available in a full implementation.');
                }
            });
        }
        
        // Enhanced hover effects with glassmorphism
        card.addEventListener('mouseenter', () => {
            const isUpcoming = card.classList.contains('upcoming');
            const accentColor = isUpcoming ? '#9D4EDD' : '#00D9FF';
            
            card.style.background = `linear-gradient(135deg, ${accentColor}12 0%, rgba(255, 255, 255, 0.08) 50%, ${accentColor}08 100%)`;
            
            // Ripple effect on hover
            createRippleEffect(card);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
        
        // 3D tilt effect for certification cards
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
            
            card.style.transform = `
                translateY(-8px) scale(1.02) 
                perspective(1000px) 
                rotateX(${-y}deg) 
                rotateY(${x}deg)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Back to top functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', throttle(() => {
        const scrollPosition = window.pageYOffset;
        const threshold = window.innerHeight * 0.5;
        
        if (scrollPosition > threshold) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
            backToTopBtn.style.transform = 'translateY(20px)';
        }
    }, 100));
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add click feedback
        backToTopBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            backToTopBtn.style.transform = '';
        }, 150);
    });
    
    // Initially hide
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.visibility = 'hidden';
    backToTopBtn.style.transform = 'translateY(20px)';
    backToTopBtn.style.transition = 'all 0.3s ease';
}

// Enhanced CTA button interactions
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Add click animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
            
            // Track CTA interactions
            const btnText = btn.textContent.trim();
            console.log(`CTA clicked: ${btnText}`);
        });
    });
}

// Enhanced section context updates
function updateContextBar() {
    const contextBar = document.getElementById('contextBar');
    const contextText = contextBar?.querySelector('.context-text');
    const contextIcon = contextBar?.querySelector('.context-icon');
    
    if (!contextBar || !contextText || !contextIcon) return;
    
    const sectionContexts = {
        'hero': { icon: '🚀', text: 'Welcome to my AI journey' },
        'about': { icon: '👨‍💻', text: 'Getting to know me' },
        'projects': { icon: '🛠️', text: 'Exploring my projects' },
        'certifications': { icon: '🎓', text: 'Professional credentials' },
        'experience': { icon: '🏆', text: 'My achievements' },
        'skills': { icon: '⚡', text: 'Technical expertise' },
        'contact': { icon: '📬', text: 'Let\'s connect!' }
    };
    
    window.addEventListener('scroll', throttle(() => {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = 'hero';
        
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        const context = sectionContexts[currentSection];
        if (context) {
            contextIcon.textContent = context.icon;
            contextText.textContent = context.text;
        }
    }, 100));
}

// Enhanced Fast Splash Screen
function initSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    
    if (!splashScreen) {
        // If no splash screen, start typing immediately
        setTimeout(() => {
            typeWriter();
        }, 500);
        return;
    }
    
    // Fast splash screen - 1.5 seconds as per user flow
    setTimeout(function() {
        splashScreen.classList.add('hidden');
        // Remove from DOM after transition
        setTimeout(() => {
            splashScreen.style.display = 'none';
            // Start typing animation after splash fades (user flow step 5)
            setTimeout(() => {
                typeWriter();
            }, 200);
        }, 500);
    }, 1500); // Show for 1.5 seconds as specified
}

// AI Chatbot System
function initAIChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotPanel = document.getElementById('chatbotPanel');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const quickQuestionBtns = document.querySelectorAll('.quick-question-btn');
    
    if (!chatbotToggle) return;
    
    let isChatOpen = false;
    
    // AI Responses Database
    const aiResponses = {
        projects: {
            answer: "Jatin has built three major AI projects: **SentinelX** (crime detection system), **RungtAI** (campus AI assistant), and **Biometric E-Voting System**. Each project showcases different aspects of AI/ML. Would you like details on any specific project? 🚀",
            suggestions: ['Tell me about SentinelX', 'How does RungtAI work?', 'Biometric voting details']
        },
        skills: {
            answer: "Jatin specializes in **Python** (90% proficiency), **OpenCV** (expert level), **TensorFlow**, and **YOLO**. He's also skilled in Flask, ReactJS, and various cloud platforms. Check the Skills section for the complete breakdown! ⚡",
            suggestions: ['Show Python projects', 'OpenCV expertise', 'Machine learning skills']
        },
        contact: {
            answer: "You can reach Jatin at **jatinnaiknawa2@gmail.com** or **+91 62327-30128**. Connect on LinkedIn: linkedin.com/in/jatin-naik16 or GitHub: github.com/Jatin-code16 📞",
            suggestions: ['Open LinkedIn', 'Send email', 'View GitHub']
        },
        resume: {
            answer: "Scrolling to the Resume section for you! You can download a PDF copy from there or explore different tabs for detailed information. 📄",
            action: () => {
                document.getElementById('resume').scrollIntoView({ behavior: 'smooth' });
            }
        },
        awards: {
            answer: "Jatin won **1st Prize in Project Competition 2025** and **2nd Best Paper Award at Shashtrarth 2025** International Conference! Both awards were for his SentinelX project. 🏆",
            suggestions: ['More about SentinelX', 'View achievements', 'Future competitions']
        },
        education: {
            answer: "Jatin is pursuing **B.Tech in IT at Rungta College** with an **8.7 CGPA**. He graduated from Sarvodaya Public School (75.2%) and Vikash Residential School (89%). 🎓",
            suggestions: ['College projects', 'Academic achievements', 'Study focus areas']
        },
        experience: {
            answer: "Jatin has completed an **AI-ML Virtual Internship** with EduSkills Foundation (AICTE & Google) and a **Summer School in Astronomy** at India Space Academy. Both in 2025! 🚀",
            suggestions: ['Internship details', 'Astronomy program', 'Future plans']
        },
        default: {
            answer: "I'm Jatin's AI assistant! I can tell you about his projects, skills, education, awards, or help you contact him. What would you like to know? 🤖",
            suggestions: ['Show me projects', 'Tell me about skills', 'How to contact Jatin', 'View achievements']
        }
    };
    
    function toggleChat() {
        isChatOpen = !isChatOpen;
        chatbotPanel.classList.toggle('active', isChatOpen);
        
        if (isChatOpen) {
            chatbotInput.focus();
            // Add a welcome message if it's the first time opening
            if (chatbotMessages.children.length === 1) {
                setTimeout(() => {
                    addMessage('bot', aiResponses.default.answer, aiResponses.default.suggestions);
                }, 500);
            }
        }
    }
    
    function addMessage(sender, text, suggestions = []) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = sender === 'bot' ? '🤖' : '👤';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // Process markdown-style text
        const processedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        contentDiv.innerHTML = `<p>${processedText}</p>`;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Add suggestions if any
        if (suggestions.length > 0 && sender === 'bot') {
            setTimeout(() => addSuggestions(suggestions), 300);
        }
    }
    
    function addSuggestions(suggestions) {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'message bot-message';
        suggestionsDiv.innerHTML = `
            <div class="message-avatar">💡</div>
            <div class="message-content">
                <div class="chat-suggestions">
                    ${suggestions.map(s => `<button class="suggestion-btn" onclick="handleSuggestion('${s}')">${s}</button>`).join('')}
                </div>
            </div>
        `;
        
        chatbotMessages.appendChild(suggestionsDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator-msg';
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        return typingDiv;
    }
    
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator-msg');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function processUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Find the best matching response
        let response = aiResponses.default;
        
        for (const [key, value] of Object.entries(aiResponses)) {
            if (key !== 'default') {
                const keywords = {
                    projects: ['project', 'sentinelx', 'rungtai', 'voting', 'build', 'created'],
                    skills: ['skill', 'python', 'opencv', 'tensorflow', 'programming', 'language'],
                    contact: ['contact', 'email', 'phone', 'reach', 'linkedin', 'github'],
                    resume: ['resume', 'cv', 'download', 'pdf'],
                    awards: ['award', 'prize', 'achievement', 'competition', 'won'],
                    education: ['education', 'college', 'school', 'study', 'cgpa', 'degree'],
                    experience: ['experience', 'internship', 'work', 'job', 'training']
                };
                
                if (keywords[key] && keywords[key].some(keyword => lowerMessage.includes(keyword))) {
                    response = value;
                    break;
                }
            }
        }
        
        // Add typing indicator
        const typingIndicator = addTypingIndicator();
        
        // Simulate AI thinking time
        setTimeout(() => {
            removeTypingIndicator();
            addMessage('bot', response.answer, response.suggestions);
            
            // Execute action if any
            if (response.action) {
                setTimeout(response.action, 500);
            }
        }, 1000 + Math.random() * 1000);
    }
    
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        addMessage('user', message);
        chatbotInput.value = '';
        
        processUserMessage(message);
    }
    
    // Event listeners
    chatbotToggle.addEventListener('click', toggleChat);
    chatbotClose.addEventListener('click', toggleChat);
    chatbotSend.addEventListener('click', sendMessage);
    
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Quick question buttons
    quickQuestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            const questionText = {
                'projects': 'Tell me about your projects',
                'skills': 'What are your skills?',
                'contact': 'How can I contact you?',
                'awards': 'What awards have you won?'
            }[question] || 'Tell me more';
            
            addMessage('user', questionText);
            processUserMessage(questionText);
        });
    });
    
    // Make handleSuggestion global
    window.handleSuggestion = (suggestion) => {
        addMessage('user', suggestion);
        processUserMessage(suggestion);
    };
}

// Smart Search System
function initSmartSearch() {
    const searchInput = document.getElementById('smartSearch');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput) return;
    
    // Search database
    const searchData = [
        { title: 'SentinelX Project', content: 'AI-powered surveillance system crime detection YOLOv11', type: 'project', target: '#projects' },
        { title: 'RungtAI Project', content: 'Campus AI companion chatbot NLP', type: 'project', target: '#projects' },
        { title: 'Biometric E-Voting', content: 'Face recognition voting system security', type: 'project', target: '#projects' },
        { title: 'Python Skills', content: 'Python programming expert 90% proficiency', type: 'skill', target: '#skills' },
        { title: 'OpenCV Expertise', content: 'Computer vision OpenCV expert level', type: 'skill', target: '#skills' },
        { title: 'TensorFlow', content: 'Machine learning TensorFlow intermediate', type: 'skill', target: '#skills' },
        { title: 'AI-ML Internship', content: 'EduSkills Foundation AICTE Google internship', type: 'experience', target: '#experience' },
        { title: 'Astronomy Program', content: 'India Space Academy summer school astrophysics', type: 'experience', target: '#experience' },
        { title: 'First Prize Award', content: 'Project competition 2025 winner SentinelX', type: 'achievement', target: '#experience' },
        { title: 'Best Paper Award', content: 'Shashtrarth 2025 international conference', type: 'achievement', target: '#experience' },
        { title: 'Contact Information', content: 'email phone LinkedIn GitHub reach connect', type: 'contact', target: '#contact' },
        { title: 'Resume Download', content: 'CV PDF download professional summary', type: 'resume', target: '#resume' }
    ];
    
    let searchTimeout;
    
    function performSearch(query) {
        if (!query.trim()) {
            hideSearchResults();
            return;
        }
        
        const results = searchData.filter(item => {
            const searchText = `${item.title} ${item.content}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });
        
        displaySearchResults(results, query);
    }
    
    function displaySearchResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        } else {
            searchResults.innerHTML = results.map(result => {
                const highlightedTitle = highlightText(result.title, query);
                return `
                    <div class="search-result-item" data-target="${result.target}">
                        <strong>${highlightedTitle}</strong>
                        <div class="search-result-type">${result.type}</div>
                    </div>
                `;
            }).join('');
        }
        
        showSearchResults();
        
        // Add click listeners to results
        searchResults.querySelectorAll('.search-result-item[data-target]').forEach(item => {
            item.addEventListener('click', () => {
                const target = document.querySelector(item.getAttribute('data-target'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    hideSearchResults();
                    searchInput.value = '';
                }
            });
        });
    }
    
    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }
    
    function showSearchResults() {
        searchResults.classList.add('active');
    }
    
    function hideSearchResults() {
        searchResults.classList.remove('active');
    }
    
    // Event listeners
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });
    
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim()) {
            showSearchResults();
        }
    });
    
    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            hideSearchResults();
        }
    });
}

// Voice Navigation System (Simulated)
function initVoiceNavigation() {
    const voiceBtn = document.getElementById('voiceNavBtn');
    const voiceFeedback = document.getElementById('voiceFeedback');
    const voiceStatus = document.getElementById('voiceStatus');
    const recognizedCommand = document.getElementById('recognizedCommand');
    
    if (!voiceBtn) return;
    
    let isListening = false;
    
    const voiceCommands = {
        'go to projects': '#projects',
        'show projects': '#projects',
        'projects': '#projects',
        'show skills': '#skills',
        'skills': '#skills',
        'go to skills': '#skills',
        'contact': '#contact',
        'contact me': '#contact',
        'how to contact': '#contact',
        'resume': '#resume',
        'show resume': '#resume',
        'cv': '#resume',
        'about': '#about',
        'about me': '#about',
        'experience': '#experience',
        'achievements': '#experience',
        'certifications': '#certifications',
        'home': '#hero',
        'top': '#hero'
    };
    
    function startListening() {
        if (isListening) return;
        
        isListening = true;
        voiceBtn.classList.add('active');
        voiceFeedback.classList.add('active');
        voiceStatus.textContent = 'Listening...';
        recognizedCommand.textContent = '';
        
        // Simulate voice recognition
        setTimeout(() => {
            const commands = Object.keys(voiceCommands);
            const randomCommand = commands[Math.floor(Math.random() * commands.length)];
            
            voiceStatus.textContent = 'Processing...';
            recognizedCommand.textContent = `"${randomCommand}"`;
            
            setTimeout(() => {
                executeVoiceCommand(randomCommand);
                stopListening();
            }, 1000);
        }, 2000);
    }
    
    function stopListening() {
        isListening = false;
        voiceBtn.classList.remove('active');
        voiceFeedback.classList.remove('active');
    }
    
    function executeVoiceCommand(command) {
        const target = voiceCommands[command.toLowerCase()];
        if (target) {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                
                // Show success message
                voiceStatus.textContent = 'Command executed!';
                setTimeout(() => {
                    voiceFeedback.classList.remove('active');
                }, 1000);
            }
        }
    }
    
    voiceBtn.addEventListener('click', startListening);
}

// AI Recommendation Engine
function initAISuggestions() {
    const suggestionsContainer = document.getElementById('aiSuggestions');
    const suggestionsGrid = document.getElementById('suggestionsGrid');
    
    if (!suggestionsContainer) return;
    
    // Simulate ML-based recommendations
    const allSuggestions = [
        {
            title: '🔍 Explore Computer Vision',
            description: 'Dive deeper into OpenCV and image processing techniques used in SentinelX.',
            action: () => scrollToSection('#projects')
        },
        {
            title: '🤖 AI Chatbot Development',
            description: 'Learn about NLP and conversational AI like RungtAI campus assistant.',
            action: () => scrollToSection('#projects')
        },
        {
            title: '📊 Data Science Skills',
            description: 'Check out the astronomy and astrophysics data analysis experience.',
            action: () => scrollToSection('#experience')
        },
        {
            title: '🏆 Award-Winning Projects',
            description: 'See the international recognition for innovative AI solutions.',
            action: () => scrollToSection('#experience')
        },
        {
            title: '📞 Connect Professionally',
            description: 'Get in touch for collaboration on AI/ML projects.',
            action: () => scrollToSection('#contact')
        },
        {
            title: '📄 Download Technical Resume',
            description: 'Get the complete technical profile and project details.',
            action: () => scrollToSection('#resume')
        }
    ];
    
    function showSuggestions() {
        // Randomly select 3 suggestions
        const selectedSuggestions = allSuggestions
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        
        suggestionsGrid.innerHTML = selectedSuggestions.map(suggestion => `
            <div class="suggestion-card">
                <h4>${suggestion.title}</h4>
                <p>${suggestion.description}</p>
            </div>
        `).join('');
        
        // Add click listeners
        suggestionsGrid.querySelectorAll('.suggestion-card').forEach((card, index) => {
            card.addEventListener('click', selectedSuggestions[index].action);
        });
        
        // Show with animation
        setTimeout(() => {
            suggestionsContainer.classList.add('active');
        }, 2000);
    }
    
    function scrollToSection(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Show suggestions after a delay
    setTimeout(showSuggestions, 3000);
    
    // Refresh suggestions every 30 seconds
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance to refresh
            showSuggestions();
        }
    }, 30000);
}

// Resume Section Interactive Features
function initResumeSection() {
    const resumeTabs = document.querySelectorAll('.resume-tab');
    const resumeTabContents = document.querySelectorAll('.resume-tab-content');
    const downloadBtn = document.getElementById('downloadResumeBtn');
    const printBtn = document.getElementById('printResumeBtn');
    
    // Tab switching
    resumeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Update active tab
            resumeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active content
            resumeTabContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('data-content') === targetTab) {
                    content.classList.add('active');
                }
            });
            
            // Animate skill bars if skills tab is activated
            if (targetTab === 'skills') {
                setTimeout(animateSkillBars, 300);
            }
        });
    });
    
    // Download resume functionality
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Simulate PDF generation
            downloadBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="16,12 12,8 8,12"/>
                <line x1="12" y1="16" y2="8" x2="12"/>
            </svg>
            Generating PDF...
            `;
            downloadBtn.disabled = true;
            
            setTimeout(() => {
            downloadBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                Open Resume (New Tab)
            `;
            downloadBtn.disabled = false;
            
            // Open the resume in a new tab (do not navigate away from current tab)
            const url = "https://mydoc16.blob.core.windows.net/uploads/Jatin's Resume.pdf";
            const encodedUrl = encodeURI(url);
            window.open(encodedUrl, '_blank', 'noopener,noreferrer');

            createGlassModal('Resume opened in a new tab! 🎉', 'The resume has been opened in a new browser tab so you can keep browsing this page.');
            }, 2000);
        });
    }
    
    // Print resume functionality
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            const url = "https://mydoc16.blob.core.windows.net/uploads/Jatin's Resume.pdf";
            const encodedUrl = encodeURI(url);
            const a = document.createElement('a');
            a.href = encodedUrl;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.click();
        });
    }
    
    // Copy contact details functionality
    const copyableElements = document.querySelectorAll('[data-copy]');
    copyableElements.forEach(element => {
        element.addEventListener('click', () => {
            const text = element.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = element.textContent;
                element.textContent = 'Copied! ✓';
                element.style.color = 'var(--neon-green)';
                
                setTimeout(() => {
                    element.textContent = originalText;
                    element.style.color = '';
                }, 2000);
            }).catch(() => {
                createGlassModal('Copy Failed', 'Could not copy to clipboard. Please select and copy manually.');
            });
        });
    });
}

// Animate skill bars in resume
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    skillBars.forEach((bar, index) => {
        const skillLevel = bar.getAttribute('data-skill');
        setTimeout(() => {
            bar.style.width = `${skillLevel}%`;
        }, index * 100);
    });
}

// Enhanced Flexible Cards
function initFlexibleCards() {
    const cards = document.querySelectorAll('.project-card, .certification-card, .achievement-badge, .stat-widget');
    
    cards.forEach((card, index) => {
        // Add stagger animation class
        card.classList.add(`card-stagger-${Math.min(index % 6 + 1, 6)}`);
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.zIndex = '';
        });
        
        // Double-click to expand (demonstration)
        card.addEventListener('dblclick', () => {
            if (card.classList.contains('card-expanded')) {
                card.classList.remove('card-expanded');
                document.body.style.overflow = '';
            } else {
                card.classList.add('card-expanded');
                document.body.style.overflow = 'hidden';
                
                // Click outside to close
                const closeExpanded = (e) => {
                    if (!card.contains(e.target)) {
                        card.classList.remove('card-expanded');
                        document.body.style.overflow = '';
                        document.removeEventListener('click', closeExpanded);
                    }
                };
                
                setTimeout(() => {
                    document.addEventListener('click', closeExpanded);
                }, 100);
            }
        });
    });
}

// Enhanced Mobile Navigation with AI features
function initEnhancedMobileNav() {
    initMobileNav(); // Call original function
    
    // Add AI features to mobile nav
    const navMenu = document.getElementById('navMenu');
    const navContent = navMenu?.querySelector('.nav-content');
    
    if (navContent) {
        // Add mobile-specific AI features
        const aiFeatures = document.createElement('div');
        aiFeatures.className = 'mobile-ai-features';
        aiFeatures.innerHTML = `
            <div class="mobile-search">
                <input type="text" class="mobile-search-input" placeholder="Search...">
            </div>
            <button class="mobile-ai-btn" id="mobileAIBtn">
                🤖 AI Assistant
            </button>
        `;
        
        navContent.appendChild(aiFeatures);
        
        // Mobile AI button
        const mobileAIBtn = document.getElementById('mobileAIBtn');
        if (mobileAIBtn) {
            mobileAIBtn.addEventListener('click', () => {
                const chatbotToggle = document.getElementById('chatbotToggle');
                if (chatbotToggle) {
                    chatbotToggle.click();
                    // Close mobile menu
                    const navToggle = document.getElementById('navToggle');
                    if (navToggle) {
                        navToggle.click();
                    }
                }
            });
        }
    }
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const html = document.documentElement;
    
    // Determine initial theme: prefer stored user preference, otherwise default to dark
    let stored = null;
    try { stored = localStorage.getItem('theme'); } catch (e) { /* ignore */ }
    let currentTheme = stored || 'dark';
    html.setAttribute('data-theme', currentTheme);
    
    // Toggle theme function
    function toggleTheme() {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        currentTheme = newTheme;
        html.setAttribute('data-theme', newTheme);
        try { localStorage.setItem('theme', newTheme); } catch (e) { /* ignore */ }
        
        // Animate toggle button with rotation
        if (themeToggleBtn) {
            themeToggleBtn.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggleBtn.style.transform = 'rotate(0deg)';
            }, 300);
        }
        
        // Update theme-dependent elements
        updateThemeElements(newTheme);
    }
    
    function updateThemeElements(theme) {
        // Update any theme-dependent styles or elements
        const body = document.body;
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Update glassmorphism elements for better contrast
        const glassElements = document.querySelectorAll('.glass-bg, .glass-panel, .glass-panel-strong');
        glassElements.forEach(el => {
            el.style.transition = 'background 0.3s ease, border-color 0.3s ease';
        });
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    // Apply initial theme styles
    updateThemeElements(currentTheme);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme toggle FIRST to ensure light theme loads properly
    initThemeToggle();
    
    // Initialize splash screen and typing
    initSplashScreen();
    initAIChatbot();
    initSmartSearch();
    initVoiceNavigation();
    initResumeSection();
    initFlexibleCards();
    initEnhancedMobileNav();
    
    initContextBar();
    initMobileNav();
    observeElements();
    initSmoothScrolling();
    initScrollIndicator();
    initParallaxEffect();
    initProjectCards();
    initCertifications();
    initSkillTags();
    initSocialLinks();
    initScrollNavigation();
    initAccessibility();
    initParticleSystem();
    initGlassmorphismEffects();
    initFunFactsCarousel();
    initAnimatedCounters();
    initProgressBars();
    initProgressRings();
    initContactForm();
    initQuickActions();
    initBackToTop();
    initCTAButtons();
    updateContextBar();
    
    console.log('✨ Jatin Naik Portfolio - AI-Enhanced with Smart Features! 🤖🚀');
    
    // Add some CSS for mobile AI features
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        .mobile-ai-features {
            padding: var(--space-md) 0;
            border-top: 1px solid var(--glass-border);
            margin-top: var(--space-md);
        }
        
        .mobile-search-input {
            width: 100%;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: var(--space-sm) var(--space-md);
            color: var(--white);
            margin-bottom: var(--space-md);
        }
        
        .mobile-ai-btn {
            width: 100%;
            background: linear-gradient(135deg, var(--electric-cyan) 0%, var(--bright-cyan) 100%);
            color: var(--primary-navy);
            border: none;
            border-radius: 20px;
            padding: var(--space-md);
            font-weight: 600;
            cursor: pointer;
        }
        
        .chat-suggestions {
            display: flex;
            flex-direction: column;
            gap: var(--space-xs);
            margin-top: var(--space-sm);
        }
        
        .suggestion-btn {
            background: var(--primary-glass);
            border: 1px solid var(--electric-cyan);
            color: var(--electric-cyan);
            padding: var(--space-xs) var(--space-sm);
            border-radius: 12px;
            cursor: pointer;
            font-size: var(--font-size-xs);
            transition: all var(--transition-fast);
        }
        
        .suggestion-btn:hover {
            background: var(--electric-cyan);
            color: var(--primary-navy);
        }
        
        @media (max-width: 768px) {
            .ai-suggestions {
                margin: var(--space-md) 0;
                padding: var(--space-md) 0;
            }
            
            .suggestions-grid {
                grid-template-columns: 1fr;
                gap: var(--space-sm);
            }
            
            .smart-search-container {
                display: none; /* Hide in mobile nav, use mobile search instead */
            }
            
            .voice-nav-btn {
                display: none; /* Hide in mobile, use mobile AI button */
            }
        }
        
        /* Print styles for resume */
        @media print {
            .resume-tabs,
            .resume-header,
            .resume-actions,
            .ai-chatbot,
            .mobile-nav,
            .context-bar,
            .voice-feedback,
            .ai-suggestions {
                display: none !important;
            }
            
            .resume-section {
                background: white !important;
                color: black !important;
            }
            
            .resume-tab-content {
                display: block !important;
                page-break-before: always;
            }
            
            .resume-tab-content:first-child {
                page-break-before: auto;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Skill Radar Chart
function createSkillRadar() {
    const canvas = document.getElementById('skillRadar');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    
    const skills = [
        { name: 'Python', level: 95, color: '#00D9FF' },
        { name: 'AI/ML', level: 85, color: '#00FF7F' },
        { name: 'Computer Vision', level: 90, color: '#9D4EDD' },
        { name: 'Web Dev', level: 75, color: '#F59E0B' },
        { name: 'Data Science', level: 80, color: '#EC4899' }
    ];
    
    function drawRadarChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 1; i <= 5; i++) {
            const currentRadius = (radius / 5) * i;
            ctx.beginPath();
            ctx.arc(centerX, centerY, currentRadius, 0, 2 * Math.PI);
            ctx.stroke();
        }
        
        // Draw skill lines and labels
        skills.forEach((skill, index) => {
            const angle = (index / skills.length) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            // Grid lines to each skill
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // Skill labels
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            const labelX = centerX + Math.cos(angle) * (radius + 20);
            const labelY = centerY + Math.sin(angle) * (radius + 20);
            ctx.fillText(skill.name, labelX, labelY);
        });
        
        // Draw skill polygon
        ctx.beginPath();
        skills.forEach((skill, index) => {
            const angle = (index / skills.length) * 2 * Math.PI - Math.PI / 2;
            const skillRadius = (skill.level / 100) * radius;
            const x = centerX + Math.cos(angle) * skillRadius;
            const y = centerY + Math.sin(angle) * skillRadius;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();
        
        // Fill polygon
        ctx.fillStyle = 'rgba(0, 217, 255, 0.1)';
        ctx.fill();
        
        // Stroke polygon
        ctx.strokeStyle = '#00D9FF';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw skill points
        skills.forEach((skill, index) => {
            const angle = (index / skills.length) * 2 * Math.PI - Math.PI / 2;
            const skillRadius = (skill.level / 100) * radius;
            const x = centerX + Math.cos(angle) * skillRadius;
            const y = centerY + Math.sin(angle) * skillRadius;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = skill.color;
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }
    
    // Animate radar chart on scroll
    const radarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(drawRadarChart, 500);
                radarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    radarObserver.observe(canvas);
}

// Initialize radar chart
setTimeout(createSkillRadar, 1000);

// Optional: Add a simple easter egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konamiSequence.toString()) {
        // Easter egg activated!
        document.body.style.animation = 'backgroundPulse 2s ease-in-out 3';
        console.log('🎉 Easter egg activated! AI systems engaged! 🤖');
        konamiCode = [];
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        typeWriter,
        observeElements,
        initSmoothScrolling,
        initContextBar,
        initAnimatedCounters,
        initProgressRings,
        createRippleEffect,
        throttle
    };
}