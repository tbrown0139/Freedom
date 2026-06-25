document.addEventListener('DOMContentLoaded', () => {
    initializeSplashScreen();
    initializeRightCards();
    initializeOverlay();
    initializeHeaderScroll();
});

function initializeParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = particle.style.height = `${Math.random() * 3 + 1}px`;
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

                if (entry.target.parentElement.classList.contains('vision-grid') ||
                    entry.target.parentElement.classList.contains('join-options') ||
                    entry.target.parentElement.classList.contains('protect-grid') ||
                    entry.target.parentElement.classList.contains('education-grid')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(
        '.vision-card, .impact-content, .impact-stats, .stat-card, .join-card, .education-card, .protect-card, .mission-content, .mission-aside'
    ).forEach(element => {
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
                const target = parseInt(counter.textContent, 10);
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

const constitutionalQuotes = [
    "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
    "The Constitution is the guide which I never will abandon.",
    "The time will come when the Constitution and government of the United States will hang by a brittle thread and will be ready to fall into other hands.",
    "The Constitution is not an instrument for the government to restrain the people, it is an instrument for the people to restrain the government.",
    "Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech...",
    "A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.",
    "The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people.",
    "Give me liberty, or give me death!",
    "They who can give up essential liberty to obtain a little temporary safety deserve neither liberty nor safety.",
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
        initializeParticles();
        initializeScrollAnimations();
        initializeStatCounters();
        return;
    }

    mainContent.style.opacity = '0';

    let currentQuote = 0;
    let progress = 0;

    quoteDisplay.textContent = constitutionalQuotes[0];
    quoteDisplay.style.opacity = '1';
    quoteDisplay.style.transform = 'translateY(0)';

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

    const progressInterval = setInterval(() => {
        progress += 0.8;
        loadingProgress.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(progressInterval);
            clearInterval(quoteInterval);

            quoteContainer.style.opacity = '0';
            quoteContainer.style.transform = 'translateY(-20px)';

            setTimeout(() => {
                splashLogo.style.display = 'block';
                splashLogo.classList.add('show');

                setTimeout(() => {
                    splashLogo.classList.add('exit');
                    splashScreen.style.opacity = '0';

                    setTimeout(() => {
                        splashScreen.remove();
                        mainContent.style.opacity = '1';
                        mainContent.style.transform = 'none';

                        initializeParticles();
                        initializeScrollAnimations();
                        initializeStatCounters();
                    }, 600);
                }, 1500);
            }, 500);
        }
    }, 50);
}

function initializeHeaderScroll() {
    const header = document.getElementById('header-container');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

const rightsDetails = {
    'first': {
        title: 'First Amendment Rights',
        text: "Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for redress of grievances.",
        explanation: "The First Amendment protects our most fundamental expressive liberties. It ensures religious freedom, free speech, a free press, peaceful assembly, and the right to petition government for redress of grievances.",
        howToProtect: [
            "Stay informed about legislation affecting First Amendment rights",
            "Exercise your rights responsibly and regularly",
            "Support organizations that defend First Amendment rights",
            "Document and report violations of First Amendment rights",
            "Engage in peaceful protests and assemblies",
            "Defend religious freedom for all faiths",
            "Support independent journalism"
        ],
        references: [
            "U.S. Constitution, First Amendment (1791)",
            "Supreme Court case: Brandenburg v. Ohio (1969)",
            "Supreme Court case: Tinker v. Des Moines (1969)"
        ]
    },
    'second': {
        title: 'Second Amendment Rights',
        text: "A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.",
        explanation: "The Second Amendment protects the individual right to keep and bear arms, recognizing that an armed citizenry is essential to the security of a free state.",
        howToProtect: [
            "Know and follow all federal and state firearms laws",
            "Obtain proper training and licensing",
            "Practice responsible gun ownership",
            "Stay informed about legislation affecting gun rights",
            "Support organizations that defend Second Amendment rights",
            "Educate others about firearm safety and responsibility"
        ],
        references: [
            "U.S. Constitution, Second Amendment (1791)",
            "Supreme Court case: District of Columbia v. Heller (2008)",
            "Supreme Court case: McDonald v. Chicago (2010)"
        ]
    },
    'due-process': {
        title: 'Due Process Rights',
        text: "No person shall be... deprived of life, liberty, or property, without due process of law...",
        explanation: "The Fourth, Fifth, and Sixth Amendments together ensure fair treatment under the law, including protection against unreasonable searches, self-incrimination, and denial of a fair trial.",
        howToProtect: [
            "Know your rights during police encounters",
            "Understand search and seizure protections",
            "Exercise your right to remain silent when appropriate",
            "Seek legal counsel when needed",
            "Document any violations of your rights",
            "Support organizations that defend due process"
        ],
        references: [
            "4th, 5th, and 6th Amendments",
            "Supreme Court case: Miranda v. Arizona (1966)",
            "Supreme Court case: Gideon v. Wainwright (1963)"
        ]
    },
    'states': {
        title: "Tenth Amendment — States' Rights",
        text: "The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people.",
        explanation: "The Tenth Amendment establishes federalism by reserving powers not explicitly given to the federal government for the states or the people. It is a critical check against centralized government overreach.",
        howToProtect: [
            "Participate in local and state government",
            "Stay informed about state legislation",
            "Vote in state and local elections",
            "Support state sovereignty initiatives",
            "Engage with state representatives",
            "Understand federal vs. state jurisdiction"
        ],
        references: [
            "U.S. Constitution, Tenth Amendment (1791)",
            "Supreme Court case: United States v. Lopez (1995)",
            "Supreme Court case: Printz v. United States (1997)"
        ]
    }
};

function openRightDetails(rightId) {
    const details = rightsDetails[rightId];
    const overlay = document.getElementById('rightDetailsOverlay');
    const contentEl = document.getElementById('rightDetailsContent');
    if (!details || !overlay || !contentEl) return;

    contentEl.innerHTML = `
        <h2>${details.title}</h2>
        <div class="amendment-text">${details.text}</div>
        <p>${details.explanation}</p>
        <div class="protection-steps">
            <h4>How to Protect This Right:</h4>
            <ul>
                ${details.howToProtect.map(step => `<li>${step}</li>`).join('')}
            </ul>
        </div>
        <div class="references">
            <h4>Key References:</h4>
            <ul>
                ${details.references.map(ref => `<li>${ref}</li>`).join('')}
            </ul>
        </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRightDetails() {
    const overlay = document.getElementById('rightDetailsOverlay');
    if (!overlay) return;

    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function initializeRightCards() {
    document.querySelectorAll('.vision-card[data-right]').forEach(card => {
        const rightId = card.dataset.right;

        card.addEventListener('click', () => openRightDetails(rightId));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openRightDetails(rightId);
            }
        });
    });
}

function initializeOverlay() {
    const overlay = document.getElementById('rightDetailsOverlay');
    if (!overlay) return;

    overlay.querySelector('.close-overlay')?.addEventListener('click', closeRightDetails);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeRightDetails();
        }
    });
}
