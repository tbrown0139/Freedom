document.addEventListener('DOMContentLoaded', () => {
    initializeSplashScreen();
    initializeRightCards();
    initializeOverlay();
});

function initializeParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.parentElement.classList.contains('vision-grid') ||
                    entry.target.parentElement.classList.contains('join-options')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.vision-card, .impact-content, .impact-stats, .stat-card, .join-card').forEach(el => {
        observer.observe(el);
    });
}

function initializeStatCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const counter = entry.target;
            const target = parseInt(counter.textContent, 10);
            const start = performance.now();
            const duration = 2000;

            function updateCount(now) {
                const progress = Math.min((now - start) / duration, 1);
                counter.textContent = progress < 1
                    ? Math.floor((1 - Math.pow(1 - progress, 4)) * target)
                    : target;
                if (progress < 1) requestAnimationFrame(updateCount);
            }

            requestAnimationFrame(updateCount);
            observer.unobserve(counter);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(counter => observer.observe(counter));
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const constitutionalQuotes = [
    "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights...",
    "Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech...",
    "A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.",
    "The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people.",
    "The Constitution is not an instrument for the government to restrain the people, it is an instrument for the people to restrain the government.",
    "Give me liberty, or give me death!",
    "They who can give up essential liberty to obtain a little temporary safety deserve neither liberty nor safety."
];

function initializeSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const quoteDisplay = document.querySelector('.quote-display');
    const loadingProgress = document.querySelector('.loading-progress');
    const mainContent = document.querySelector('main');
    const quoteContainer = document.querySelector('.quote-container');
    const splashLogo = document.querySelector('.splash-logo');

    if (!splashScreen || !quoteDisplay || !loadingProgress || !mainContent) {
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

const rightsDetails = {
    first: {
        title: 'First Amendment',
        text: 'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.',
        explanation: 'This amendment protects your right to speak freely, practice your faith, publish ideas, gather peacefully, and demand accountability from government. Government cannot legally silence you — but only if you know this right exists and insist on it.',
        howToProtect: [
            'Exercise your right to speak and assemble peacefully',
            'Stay informed about laws that restrict speech or religion',
            'Support a free press and independent journalism',
            'Petition elected officials when rights are threatened'
        ],
        references: ['U.S. Constitution, First Amendment (1791)']
    },
    second: {
        title: 'Second Amendment',
        text: 'A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.',
        explanation: 'The Second Amendment protects the individual right to keep and bear arms. It exists so that a free people cannot be easily disarmed or dominated by those in power.',
        howToProtect: [
            'Know federal and state firearms laws',
            'Practice responsible gun ownership',
            'Stay informed about legislation affecting this right',
            'Defend the right through lawful civic engagement'
        ],
        references: ['U.S. Constitution, Second Amendment (1791)']
    },
    'due-process': {
        title: 'Due Process Rights',
        text: 'No person shall be... deprived of life, liberty, or property, without due process of law...',
        explanation: 'The 4th, 5th, and 6th Amendments protect you from unreasonable searches, forced self-incrimination, and unfair trials. Government must follow the law before it can take your freedom or property.',
        howToProtect: [
            'Know your rights during police encounters',
            'Understand protections against unreasonable searches',
            'Seek legal counsel when your rights may be violated',
            'Document and report violations'
        ],
        references: ['4th, 5th, and 6th Amendments']
    },
    states: {
        title: "Tenth Amendment — States' Rights",
        text: 'The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people.',
        explanation: 'The federal government only has powers the Constitution gives it. Everything else belongs to the states or to you. This is a critical limit on government overreach — and one most Americans have never read.',
        howToProtect: [
            'Vote in state and local elections',
            'Follow state legislation, not just federal news',
            'Hold officials accountable to constitutional limits',
            'Understand what the federal government can and cannot do'
        ],
        references: ['U.S. Constitution, Tenth Amendment (1791)']
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
            <ul>${details.howToProtect.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>
        <div class="references">
            <h4>Source:</h4>
            <ul>${details.references.map(r => `<li>${r}</li>`).join('')}</ul>
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
        if (e.target === overlay) closeRightDetails();
    });
}
