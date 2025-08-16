class InfiniteCardCarousel {
    constructor() {
        this.container = document.querySelector('.carousel-container');
        this.track = document.querySelector('.card-track');
        this.indicator = document.querySelector('.carousel-indicator');

        // Configuration
        this.totalCards = 10;
        this.visibleCards = 3;
        this.cardHeight = 200;
        this.cardGap = 16;
        this.cardSpacing = this.cardHeight + this.cardGap;

        // State
        this.currentIndex = 0;
        this.isScrolling = false;
        this.scrollTimeout = null;

        this.init();
    }

    init() {
        this.createCards();
        this.createIndicators();
        this.setupIntersectionObserver();
        this.setupScrollHandler();
        this.updateVisibility();
    }

    createCards() {
        // Create enough cards to fill the infinite scroll
        // Triple for smooth infinite scroll
        const totalCardsToCreate = this.totalCards * 3;

        for (let i = 0; i < totalCardsToCreate; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.pageId = (i % this.totalCards);
            card.dataset.index = i;

            const cardNumber = (i % this.totalCards) + 1;
            card.innerHTML = `Card ${cardNumber}`;

            card.addEventListener('click', () => {
                console.log(`Clicked card ${card.dataset.pageId}`);
                // Handle navigation here
                // window.location.href = `/page/${card.dataset.pageId}`;
            });

            this.track.appendChild(card);
        }
    }

    createIndicators() {
        for (let i = 0; i < this.totalCards; i++) {
            const dot = document.createElement('div');
            dot.className = 'indicator-dot';
            dot.dataset.index = i;
            this.indicator.appendChild(dot);
        }
    }

    setupIntersectionObserver() {
        const options = {
            root: this.container,
            rootMargin: '-40% 0px -40% 0px', // Only trigger when card is in center 20%
            threshold: 0.5
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const card = entry.target;
                const index = parseInt(card.dataset.index);

                if (entry.isIntersecting) {
                    // Card is in the center focus area
                    card.classList.add('focused');
                    this.currentIndex = parseInt(card.dataset.pageId);
                    this.updateIndicator();
                } else {
                    card.classList.remove('focused');
                }
            });
        }, options);

        // Observe all cards
        this.track.querySelectorAll('.card').forEach(card => {
            this.observer.observe(card);
        });
    }

    setupScrollHandler() {
        this.container.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                this.isScrolling = true;
            }

            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.isScrolling = false;
                this.handleInfiniteScroll();
            }, 150);

            this.updateVisibility();
        });
    }

    updateVisibility() {
        const containerRect = this.container.getBoundingClientRect();
        const containerCenter = containerRect.top + containerRect.height / 2;

        this.track.querySelectorAll('.card').forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.top + cardRect.height / 2;
            const distanceFromCenter = Math.abs(cardCenter - containerCenter);

            // Calculate visibility based on distance from center
            const maxDistance = containerRect.height / 2;
            const visibility = Math.max(0, 1 - (distanceFromCenter / maxDistance));

            if (visibility > 0.1) {
                card.classList.add('visible');
                card.style.opacity = Math.max(0.3, visibility);
                card.style.transform = `scale(${0.9 + (visibility * 0.15)})`;
            } else {
                card.classList.remove('visible');
                card.style.opacity = '0.1';
                card.style.transform = 'scale(0.8)';
            }
        });
    }

    handleInfiniteScroll() {
        const scrollTop = this.container.scrollTop;
        const scrollHeight = this.container.scrollHeight;
        const clientHeight = this.container.clientHeight;

        const threshold = 500; // Pixels from edge to trigger reset

        if (scrollTop < threshold) {
            // Near top, jump to bottom section
            this.container.scrollTop = scrollHeight - clientHeight - threshold;
        } else if (scrollTop > scrollHeight - clientHeight - threshold) {
            // Near bottom, jump to top section
            this.container.scrollTop = threshold;
        }
    }

    updateIndicator() {
        this.indicator.querySelectorAll('.indicator-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
}

// Initialize the carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InfiniteCardCarousel();
});
