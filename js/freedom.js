document.addEventListener('DOMContentLoaded', () => {
    initializeSplashScreen();
    initializeParticles();
    initializeScrollAnimations();
    initializeStatCounters();
});

function initializeParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and size
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = particle.style.height = `${Math.random() * 3 + 1}px`;
        
        // Random animation duration and delay
        particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect for grid items
                if (entry.target.parentElement.classList.contains('vision-grid') ||
                    entry.target.parentElement.classList.contains('join-options')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.querySelectorAll('.vision-card, .impact-content, .impact-stats, .stat-card, .join-card').forEach(element => {
        observer.observe(element);
    });
}

function initializeStatCounters() {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                let count = 0;
                const duration = 2000;
                const start = performance.now();

                function easeOutQuart(x) {
                    return 1 - Math.pow(1 - x, 4);
                }

                function updateCount(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);

                    if (progress < 1) {
                        count = Math.floor(easeOutQuart(progress) * target);
                        counter.textContent = count;
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(updateCount);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-number').forEach(counter => {
        observer.observe(counter);
    });
}

// Smooth scroll for anchor links
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

// Inspiring constitutional and freedom quotes
const constitutionalQuotes = [
    "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
    "The Constitution is the guide which I never will abandon.",
    "Our Constitution was made only for a moral and religious people. It is wholly inadequate to the government of any other.",
    "The tree of liberty must be refreshed from time to time with the blood of patriots and tyrants.",
    "They who can give up essential liberty to obtain a little temporary safety deserve neither liberty nor safety.",
    "Give me liberty, or give me death!",
    "The Constitution is not an instrument for the government to restrain the people, it is an instrument for the people to restrain the government.",
    "I consider trial by jury as the only anchor ever yet imagined by man, by which a government can be held to the principles of its constitution.",
    "The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people.",
    "Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech...",
    "A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.",
    "The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated...",
    "No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a Grand Jury...",
    "In all criminal prosecutions, the accused shall enjoy the right to a speedy and public trial..."
];

function initializeSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const quoteDisplay = document.querySelector('.quote-display');
    const loadingProgress = document.querySelector('.loading-progress');
    const mainContent = document.querySelector('main');
    const quoteContainer = document.querySelector('.quote-container');
    const splashLogo = document.querySelector('.splash-logo');
    
    if (!splashScreen || !quoteDisplay || !loadingProgress || !mainContent || !quoteContainer || !splashLogo) {
        console.error('Required elements not found');
        return;
    }

    // Update logo source to white version
    splashLogo.src = 'images/Knovon_White.png';

    // Ensure main content is hidden initially
    mainContent.style.opacity = '0';
    
    let currentQuote = 0;
    let progress = 0;

    // Display first quote immediately
    quoteDisplay.textContent = constitutionalQuotes[0];
    quoteDisplay.style.opacity = '1';
    quoteDisplay.style.transform = 'translateY(0)';

    // Change quotes every 3 seconds with smooth transitions
    const quoteInterval = setInterval(() => {
        quoteDisplay.style.opacity = '0';
        quoteDisplay.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            currentQuote = (currentQuote + 1) % constitutionalQuotes.length;
            quoteDisplay.textContent = constitutionalQuotes[currentQuote];
            quoteDisplay.style.opacity = '1';
            quoteDisplay.style.transform = 'translateY(0)';
        }, 500);
    }, 3000);

    // Slower progress bar for longer display
    const progressInterval = setInterval(() => {
        progress += 0.8;
        loadingProgress.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(progressInterval);
            clearInterval(quoteInterval);
            
            // Final quote fade out
            quoteContainer.style.opacity = '0';
            quoteContainer.style.transform = 'translateY(-20px)';
            
            // Show logo
            setTimeout(() => {
                splashLogo.style.display = 'block';
                splashLogo.classList.add('show');
                
                // Exit sequence
                setTimeout(() => {
                    splashLogo.classList.add('exit');
                    splashScreen.style.opacity = '0';
                    
                    // Show main content
                    setTimeout(() => {
                        splashScreen.remove();
                        mainContent.style.opacity = '1';
                        mainContent.style.transform = 'none';
                        
                        // Initialize features
                        initializeParticles();
                        initializeScrollAnimations();
                        initializeStatCounters();
                    }, 600);
                }, 1500);
            }, 500);
        }
    }, 50);
}

// Add header scroll effect
function initializeHeaderScroll() {
    const header = document.getElementById('header-container');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSplashScreen();
}); 