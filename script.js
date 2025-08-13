// Premium Birthday Website - Modern ES6+ JavaScript
class BirthdayWebsite {
    constructor() {
        this.currentMemoryIndex = 0;
        this.memoriesData = [
            {
                id: 1,
                src: './img1.jpg',
                title: 'Kỷ niệm đầu tiên',
                description: 'Ngày chúng ta gặp nhau lần đầu tiên, khoảnh khắc đáng nhớ nhất trong cuộc đời anh.',
                date: 'Ngày đầu tiên'
            },
            {
                id: 2,
                src: './img2.jpg',
                title: 'Kỷ niệm đẹp',
                description: 'Những khoảnh khắc vui vẻ, tiếng cười của em làm trái tim anh tan chảy.',
                date: 'Kỷ niệm vui vẻ'
            },
            {
                id: 3,
                src: './img3.jpg',
                title: 'Kỷ niệm đáng nhớ',
                description: 'Những chuyến đi cùng nhau, khám phá thế giới bên cạnh người mình yêu.',
                date: 'Chuyến đi đáng nhớ'
            },
            {
                id: 4,
                src: './img4.jpg',
                title: 'Bữa tối kỷ niệm',
                description: 'Ngày đặc biệt được đánh dấu bằng bàn ăn đầy đầy tình cảm.',
                date: 'Tối kỷ niệm'
            },
            {
                id: 5,
                src: './img5.jpg',
                title: 'Cùng nhau đón Tết',
                description: 'Những lời chúc, phong bao đỏ và cảm giác yêu thương.',
                date: 'Tết yêu thương'
            },
            {
                id: 6,
                src: './img6.jpg',
                title: 'Đi chụp ảnh chung',
                description: 'Ghi lại từng khoảnh khắc và đóng băng thời gian.',
                date: 'Bức ảnh đôi'
            },
            {
                id: 7,
                src: './img7.jpg',
                title: 'Kỷ niệm đặc biệt',
                description: 'Những khoảnh khắc quý giá, mỗi giây phút bên em đều là món quà.',
                date: 'Khoảnh khắc quý giá'
            },
            {
                id: 8,
                src: './img8.jpg',
                title: 'Kỷ niệm tình yêu',
                description: 'Những cái ôm ấm áp, cảm giác được yêu thương và che chở.',
                date: 'Tình yêu ấm áp'
            },           
        ];
        
        this.init();
    }

    init() {
        this.checkOrientation();
        this.bindEvents();
        this.createMemoriesGrid();
    }

    // Orientation Check
    checkOrientation() {
        const isPortrait = window.innerHeight > window.innerWidth;
        const orientationModal = document.getElementById('orientation-modal');
        const mainContent = document.getElementById('main-content');
        const countdownOverlay = document.getElementById('countdown-overlay');

        if (isPortrait) {
            orientationModal.style.display = 'flex';
            mainContent.style.display = 'none';
            countdownOverlay.style.display = 'none';
        } else {
            orientationModal.style.display = 'none';
            this.startCountdownSequence();
        }
    }

    // Countdown Sequence
    startCountdownSequence() {
        const countdownOverlay = document.getElementById('countdown-overlay');
        const countdownNumber = document.getElementById('countdown-number');
        const countdownText = document.getElementById('countdown-text');
        
        countdownOverlay.style.display = 'flex';
        
        // Create floating hearts animation
        this.animateCountdownHearts();
        
        // Countdown sequence with smooth transitions
        const countdownSequence = [
            { number: '3', text: 'Chuẩn bị...', delay: 1000 },
            { number: '2', text: 'Sẵn sàng...', delay: 2000 },
            { number: '1', text: 'Gần xong...', delay: 3000 }
        ];

        countdownSequence.forEach((step, index) => {
            setTimeout(() => {
                countdownNumber.textContent = step.number;
                countdownText.textContent = step.text;
                
                // Add pulse animation
                countdownNumber.style.animation = 'none';
                setTimeout(() => {
                    countdownNumber.style.animation = 'countdownPulse 1s ease-in-out infinite';
                }, 10);
                
                // If it's the last step, transition to main page
                if (index === countdownSequence.length - 1) {
                    setTimeout(() => {
                        this.transitionToMainPage();
                    }, 1000);
                }
            }, step.delay);
        });
    }

    // Animate countdown hearts
    animateCountdownHearts() {
        const overlay = document.getElementById('countdown-overlay');
        if (!overlay) return;

        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'countdown-hearts';
        heartsContainer.style.position = 'absolute';
        heartsContainer.style.left = '0';
        heartsContainer.style.top = '0';
        heartsContainer.style.width = '100%';
        heartsContainer.style.height = '100%';
        heartsContainer.style.pointerEvents = 'none';
        heartsContainer.style.overflow = 'hidden';
        overlay.appendChild(heartsContainer);

        // Optimized for mobile performance
        const maxHearts = 30; // Reduced from unlimited
        const hearts = [];

        const createHeart = () => {
            return {
                x: Math.random() * heartsContainer.clientWidth,
                y: -30,
                size: Math.random() * 18 + 12, // Slightly smaller
                speed: Math.random() * 1.5 + 0.8, // Slightly slower
                drift: (Math.random() - 0.5) * 0.4, // Less drift
                element: null
            };
        };

        const drawHeart = (h) => {
            if (!h.element) {
                const el = document.createElement('div');
                el.textContent = '❤️';
                el.style.position = 'absolute';
                el.style.willChange = 'transform'; // Hardware acceleration
                el.style.fontSize = `${h.size}px`;
                heartsContainer.appendChild(el);
                h.element = el;
            }
            // Use transform3d for better mobile performance
            h.element.style.transform = `translate3d(${h.x}px, ${h.y}px, 0)`;
        };

        let running = true;
        let lastTime = 0;
        const targetFPS = 30; // Reduced FPS for mobile battery saving
        const frameInterval = 1000 / targetFPS;

        const tick = (currentTime) => {
            if (!running) return;
            
            // Throttle FPS for better mobile performance
            if (currentTime - lastTime < frameInterval) {
                requestAnimationFrame(tick);
                return;
            }
            lastTime = currentTime;

            // Create hearts less frequently
            if (Math.random() < 0.06 && hearts.length < maxHearts) {
                hearts.push(createHeart());
            }

            for (let i = hearts.length - 1; i >= 0; i--) {
                const h = hearts[i];
                h.y += h.speed;
                h.x += h.drift;
                drawHeart(h);
                
                if (h.y > heartsContainer.clientHeight + 40) {
                    if (h.element) h.element.remove();
                    hearts.splice(i, 1);
                }
            }
            requestAnimationFrame(tick);
        };
        tick(0);

        const stop = () => {
            running = false;
            hearts.forEach(h => h.element && h.element.remove());
            if (heartsContainer.parentNode) heartsContainer.parentNode.removeChild(heartsContainer);
        };

        const cleanup = () => stop();
        overlay.addEventListener('transitionend', cleanup, { once: true });
    }

    // Transition to main page
    transitionToMainPage() {
        const countdownOverlay = document.getElementById('countdown-overlay');
        const mainContent = document.getElementById('main-content');
        
        countdownOverlay.style.opacity = '0';
        countdownOverlay.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            countdownOverlay.style.display = 'none';
            mainContent.style.display = 'block';
            mainContent.classList.add('fade-in');
            
            // Initialize main page animations
            this.initializeMainPage();
        }, 500);
    }

    // Initialize main page
    initializeMainPage() {
        this.animateHeroSection();
        this.createFloatingElements();
        this.createHeartMatrix();
        this.addScrollAnimations();
    }

    // Animate hero section
    animateHeroSection() {
        const titleLines = document.querySelectorAll('.title-line');
        const birthdayDate = document.querySelector('.birthday-date');
        const specialMessage = document.querySelector('.special-message');
        
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 300);
        });
        
        setTimeout(() => {
            birthdayDate.style.opacity = '1';
            birthdayDate.style.transform = 'scale(1)';
        }, 800);
        
        setTimeout(() => {
            specialMessage.style.opacity = '1';
            specialMessage.style.transform = 'translateY(0)';
        }, 1200);
    }

    // Create floating background elements
    createFloatingElements() {
        const floatingElements = document.querySelector('.floating-elements');
        const emojis = ['🎂', '🎉', '🎊', '✨', '💫', '🌟', '💖', '💕', '💝'];
        
        emojis.forEach((emoji, index) => {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.textContent = emoji;
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            element.style.animationDelay = `${Math.random() * 18}s`; // Slightly reduced
            element.style.animationDuration = `${14 + Math.random() * 8}s`; // Slightly reduced
            
            floatingElements.appendChild(element);
        });
    }

    createHeartMatrix() {
        const animatedBg = document.querySelector('.animated-bg');
        
        // Create heart matrix container
        const heartMatrix = document.createElement('div');
        heartMatrix.className = 'heart-matrix';
        animatedBg.appendChild(heartMatrix);
        
        // Optimized for mobile: fewer columns and hearts
        const columns = 12; // Reduced from 17
        const heartsPerColumn = 15; // Reduced from 20
        
        for (let col = 0; col < columns; col++) {
            const column = document.createElement('div');
            column.className = 'heart-column';
            
            for (let heart = 0; heart < heartsPerColumn; heart++) {
                const heartElement = document.createElement('div');
                heartElement.className = 'matrix-heart';
                heartElement.innerHTML = '💖';
                column.appendChild(heartElement);
            }
            
            heartMatrix.appendChild(column);
        }
    }

    // Add scroll animations
    addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe sections for animation
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Create memories grid
    createMemoriesGrid() {
        const memoriesGrid = document.getElementById('memories-grid');
        
        this.memoriesData.forEach((memory, index) => {
            const memoryItem = this.createMemoryItem(memory, index);
            memoriesGrid.appendChild(memoryItem);
        });
    }

    // Create individual memory item
    createMemoryItem(memory, index) {
        const memoryItem = document.createElement('div');
        memoryItem.className = 'memory-item';
        memoryItem.style.animationDelay = `${index * 0.1}s`;
        
        memoryItem.innerHTML = `
            <div class="memory-image">
                <img src="${memory.src}" alt="${memory.title}" class="memory-thumbnail">
            </div>
            <div class="memory-overlay">
                <div class="memory-title">${memory.title}</div>
                <div class="memory-date">${memory.date}</div>
            </div>
        `;
        
        // Add click event
        memoryItem.addEventListener('click', () => {
            this.showMemoryModal(memory.id);
        });
        
        return memoryItem;
    }

    // Show memory modal
    showMemoryModal(memoryId) {
        const modal = document.getElementById('memory-modal');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalDate = document.getElementById('modal-date');
        
        this.currentMemoryIndex = memoryId - 1;
        const memory = this.memoriesData[this.currentMemoryIndex];
        
        modalImage.src = memory.src;
        modalTitle.textContent = memory.title;
        modalDescription.textContent = memory.description;
        modalDate.textContent = memory.date;
        
        modal.style.display = 'flex';
        
        // Add entrance animation
        setTimeout(() => {
            modal.classList.add('fade-in');
        }, 10);
        
        // Add sparkle effect
        this.createSparkleEffect(modal);
    }

    // Hide memory modal
    hideMemoryModal() {
        const modal = document.getElementById('memory-modal');
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 300);
    }

    // Navigate to previous memory
    previousMemory() {
        this.currentMemoryIndex = (this.currentMemoryIndex - 1 + this.memoriesData.length) % this.memoriesData.length;
        this.updateModalContent();
    }

    // Navigate to next memory
    nextMemory() {
        this.currentMemoryIndex = (this.currentMemoryIndex + 1) % this.memoriesData.length;
        this.updateModalContent();
    }

    // Update modal content
    updateModalContent() {
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalDate = document.getElementById('modal-date');
        
        const memory = this.memoriesData[this.currentMemoryIndex];
        
        // Fade out current content
        modalImage.style.opacity = '0';
        modalTitle.style.opacity = '0';
        modalDescription.style.opacity = '0';
        modalDate.style.opacity = '0';
        
        setTimeout(() => {
            // Update content
            modalImage.src = memory.src;
            modalTitle.textContent = memory.title;
            modalDescription.textContent = memory.description;
            modalDate.textContent = memory.date;
            
            // Fade in new content
            modalImage.style.opacity = '1';
            modalTitle.style.opacity = '1';
            modalDescription.style.opacity = '1';
            modalDate.style.opacity = '1';
        }, 200);
    }

    // Create sparkle effect
    createSparkleEffect(container) {
        // Optimized for mobile: fewer sparkles
        for (let i = 0; i < 12; i++) { // Reduced from 15
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.fontSize = (Math.random() * 18 + 14) + 'px'; // Slightly smaller
                sparkle.style.animation = 'sparkle 1.8s ease-in-out infinite'; // Slightly faster
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '1000';
                
                container.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1800); // Match animation duration
            }, i * 120); // Slightly increased delay
        }
    }

    // Bind event listeners
    bindEvents() {
        // Orientation change events
        window.addEventListener('resize', () => {
            this.checkOrientation();
        });
        
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.checkOrientation();
            }, 100);
        });
        
        // Modal events
        const modalClose = document.getElementById('modal-close');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const memoryModal = document.getElementById('memory-modal');
        
        modalClose.addEventListener('click', () => {
            this.hideMemoryModal();
        });
        
        prevBtn.addEventListener('click', () => {
            this.previousMemory();
        });
        
        nextBtn.addEventListener('click', () => {
            this.nextMemory();
        });
        
        // Close modal when clicking outside
        memoryModal.addEventListener('click', (e) => {
            if (e.target === memoryModal) {
                this.hideMemoryModal();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (memoryModal.style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        this.hideMemoryModal();
                        break;
                    case 'ArrowLeft':
                        this.previousMemory();
                        break;
                    case 'ArrowRight':
                        this.nextMemory();
                        break;
                }
            }
        });
        
        // Touch support for mobile
        document.addEventListener('touchstart', () => {
            // Enable touch interactions
        }, { passive: true });
    }
}

// Add CSS animations for sparkle effect
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0%, 100% { 
            opacity: 0; 
            transform: scale(0) rotate(0deg); 
        }
        50% { 
            opacity: 1; 
            transform: scale(1) rotate(180deg); 
        }
    }
    
    .memory-item {
        opacity: 0;
        transform: translateY(30px);
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .title-line {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .birthday-date {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.6s ease-out;
    }
    
    .special-message {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    section.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(sparkleStyle);

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayWebsite();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
