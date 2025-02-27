// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.request-card, .institution-card, .stat-card');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeObserver.observe(element);
    });

    // Sample donation requests data with more details
    const sampleRequests = [
        {
            title: "School Supplies for Children",
            institution: "Hope Elementary School",
            needed: 150000,
            raised: 98000,
            deadline: "2025-03-15",
            category: "Education",
            urgency: "High",
            impact: "Help 200 students"
        },
        {
            title: "Medical Equipment",
            institution: "City Hospital",
            needed: 500000,
            raised: 375000,
            deadline: "2025-03-20",
            category: "Healthcare",
            urgency: "Critical",
            impact: "Support 500 patients"
        },
        {
            title: "Food Bank Supplies",
            institution: "Community Food Bank",
            needed: 75000,
            raised: 45000,
            deadline: "2025-03-10",
            category: "Food Security",
            urgency: "Medium",
            impact: "Feed 100 families"
        }
    ];

    // Enhanced render donation request cards
    const requestCardsContainer = document.querySelector('.request-cards');
    if (requestCardsContainer) {
        sampleRequests.forEach(request => {
            const progress = (request.raised / request.needed) * 100;
            const urgencyColor = {
                'Critical': '#EF4444',
                'High': '#F97316',
                'Medium': '#F59E0B'
            }[request.urgency] || '#10B981';

            const card = document.createElement('div');
            card.className = 'request-card';
            card.innerHTML = `
                <div class="card" style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: var(--shadow);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <h3 style="color: var(--primary); margin: 0;">${request.title}</h3>
                        <span class="urgency-badge" style="
                            background-color: ${urgencyColor};
                            color: white;
                            padding: 0.25rem 0.75rem;
                            border-radius: 999px;
                            font-size: 0.875rem;
                        ">${request.urgency}</span>
                    </div>
                    <p style="color: var(--text); margin-bottom: 1rem;">${request.institution}</p>
                    <div class="category-tag" style="
                        display: inline-block;
                        background: var(--background);
                        padding: 0.25rem 0.75rem;
                        border-radius: 999px;
                        font-size: 0.875rem;
                        margin-bottom: 1rem;
                    ">
                        <i class="fas fa-tag" style="margin-right: 0.5rem;"></i>${request.category}
                    </div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${progress}%;"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                        <span>Raised: ₹${request.raised.toLocaleString('en-IN')}</span>
                        <span>Goal: ₹${request.needed.toLocaleString('en-IN')}</span>
                    </div>
                    <p style="font-size: 0.875rem; color: var(--text); margin-bottom: 1rem;">
                        <i class="fas fa-heart" style="color: var(--accent); margin-right: 0.5rem;"></i>${request.impact}
                    </p>
                    <button class="btn-primary" style="width: 100%;">Donate Now</button>
                </div>
            `;

            // Add hover effect for the card
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.transition = 'transform 0.3s ease';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });

            requestCardsContainer.appendChild(card);
        });
    }

    // Enhanced institutions data
    const sampleInstitutions = [
        {
            name: "Hope Elementary School",
            description: "Supporting education for underprivileged children",
            verified: true,
            rating: 4.8,
            totalDonations: 150,
            category: "Education"
        },
        {
            name: "City Hospital",
            description: "Providing quality healthcare for all",
            verified: true,
            rating: 4.9,
            totalDonations: 280,
            category: "Healthcare"
        },
        {
            name: "Community Food Bank",
            description: "Fighting hunger in our community",
            verified: true,
            rating: 4.7,
            totalDonations: 120,
            category: "Food Security"
        }
    ];

    // Enhanced render institution cards
    const institutionCardsContainer = document.querySelector('.institution-cards');
    if (institutionCardsContainer) {
        sampleInstitutions.forEach(institution => {
            const card = document.createElement('div');
            card.className = 'institution-card';
            card.innerHTML = `
                <div class="card" style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: var(--shadow);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div>
                            <h3 style="color: var(--primary); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                                ${institution.name}
                                ${institution.verified ? '<i class="fas fa-check-circle" style="color: var(--interactive);"></i>' : ''}
                            </h3>
                            <div style="margin-top: 0.5rem;">
                                <span style="color: #F59E0B;">
                                    ${'★'.repeat(Math.floor(institution.rating))}
                                    ${'☆'.repeat(5 - Math.floor(institution.rating))}
                                </span>
                                <span style="font-size: 0.875rem; color: var(--text);">(${institution.rating})</span>
                            </div>
                        </div>
                        <span class="category-badge" style="
                            background: var(--background);
                            padding: 0.25rem 0.75rem;
                            border-radius: 999px;
                            font-size: 0.875rem;
                        ">${institution.category}</span>
                    </div>
                    <p style="color: var(--text); margin-bottom: 1rem;">${institution.description}</p>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <i class="fas fa-gift" style="color: var(--accent);"></i>
                        <span>${institution.totalDonations} donations received</span>
                    </div>
                    <div style="display: flex; gap: 1rem;">
                        <button class="btn-primary" style="flex: 2;">View Details</button>
                        <button class="btn-secondary" style="flex: 1;">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            `;

            institutionCardsContainer.appendChild(card);
        });
    }

    // Smooth scrolling with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const startPosition = window.pageYOffset;
            const targetPosition = target.getBoundingClientRect().top + startPosition;
            const startTime = performance.now();
            const duration = 1000;

            function ease(t) {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            }

            function animation(currentTime) {
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                
                window.scrollTo(0, startPosition + (targetPosition * ease(progress)));

                if (progress < 1) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        });
    });

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        });
    }
});
