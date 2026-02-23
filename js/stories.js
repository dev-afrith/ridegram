/**
 * RideGram - Interactive Stories Feature
 * Full-screen story viewer with auto-advance
 */

class StoryViewer {
    constructor() {
        this.stories = [];
        this.currentStoryIndex = 0;
        this.currentItemIndex = 0;
        this.timer = null;
        this.DURATION = 5000; // 5 seconds per story

        this.init();
    }

    init() {
        // Create modal container
        this.modal = document.createElement('div');
        this.modal.className = 'story-modal';
        this.modal.innerHTML = `
            <div class="story-modal-content">
                <div class="story-progress">
                    <div class="story-progress-bars"></div>
                </div>
                <div class="story-header">
                    <div class="story-user">
                        <img class="story-avatar" src="" alt="">
                        <div>
                            <span class="story-username"></span>
                            <span class="story-time"></span>
                        </div>
                    </div>
                    <button class="story-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="story-media">
                    <img class="story-image" src="" alt="">
                </div>
                <div class="story-navigation">
                    <div class="story-nav-prev"></div>
                    <div class="story-nav-next"></div>
                </div>
            </div>
        `;

        document.body.appendChild(this.modal);

        // Add styles
        this.addStyles();

        // Event listeners
        this.modal.querySelector('.story-close').addEventListener('click', () => this.close());
        this.modal.querySelector('.story-nav-prev').addEventListener('click', () => this.prev());
        this.modal.querySelector('.story-nav-next').addEventListener('click', () => this.next());

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Attach to story items
        document.querySelectorAll('.story-item').forEach((item, index) => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => this.open(index));
        });
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .story-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                z-index: 2000;
                display: none;
                align-items: center;
                justify-content: center;
            }
            .story-modal.active {
                display: flex;
            }
            .story-modal-content {
                position: relative;
                width: 100%;
                max-width: 420px;
                height: 90vh;
                max-height: 750px;
                background: #000;
                border-radius: 12px;
                overflow: hidden;
            }
            .story-progress {
                position: absolute;
                top: 8px;
                left: 8px;
                right: 8px;
                z-index: 10;
            }
            .story-progress-bars {
                display: flex;
                gap: 4px;
            }
            .story-progress-bar {
                flex: 1;
                height: 3px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 2px;
                overflow: hidden;
            }
            .story-progress-bar .fill {
                height: 100%;
                background: white;
                width: 0%;
                transition: width linear;
            }
            .story-progress-bar.completed .fill {
                width: 100%;
            }
            .story-progress-bar.active .fill {
                animation: storyProgress 5s linear forwards;
            }
            @keyframes storyProgress {
                from { width: 0%; }
                to { width: 100%; }
            }
            .story-header {
                position: absolute;
                top: 20px;
                left: 12px;
                right: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                z-index: 10;
            }
            .story-user {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .story-avatar {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border: 2px solid white;
            }
            .story-username {
                color: white;
                font-weight: 600;
                font-size: 14px;
                display: block;
            }
            .story-time {
                color: rgba(255, 255, 255, 0.7);
                font-size: 12px;
            }
            .story-close {
                width: 36px;
                height: 36px;
                border: none;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .story-media {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .story-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .story-navigation {
                position: absolute;
                top: 80px;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
            }
            .story-nav-prev, .story-nav-next {
                flex: 1;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    }

    loadStories() {
        // Get stories from DOM
        const storyItems = document.querySelectorAll('.story-item');
        this.stories = Array.from(storyItems).map(item => ({
            username: item.querySelector('.story-label')?.textContent || 'User',
            avatar: item.querySelector('img')?.src || '',
            image: item.dataset.storyImage || item.querySelector('img')?.src || '',
            time: '2h ago'
        }));
    }

    open(index) {
        this.loadStories();
        this.currentStoryIndex = index;
        this.currentItemIndex = 0;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.showCurrentStory();
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.stopTimer();
    }

    showCurrentStory() {
        const story = this.stories[this.currentStoryIndex];
        if (!story) return;

        // Update UI
        this.modal.querySelector('.story-avatar').src = story.avatar;
        this.modal.querySelector('.story-username').textContent = story.username;
        this.modal.querySelector('.story-time').textContent = story.time;
        this.modal.querySelector('.story-image').src = story.image;

        // Update progress bars
        const barsContainer = this.modal.querySelector('.story-progress-bars');
        barsContainer.innerHTML = this.stories.map((_, i) => `
            <div class="story-progress-bar ${i < this.currentStoryIndex ? 'completed' : ''} ${i === this.currentStoryIndex ? 'active' : ''}">
                <div class="fill"></div>
            </div>
        `).join('');

        this.startTimer();
    }

    startTimer() {
        this.stopTimer();
        this.timer = setTimeout(() => this.next(), this.DURATION);
    }

    stopTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    next() {
        this.stopTimer();
        if (this.currentStoryIndex < this.stories.length - 1) {
            this.currentStoryIndex++;
            this.showCurrentStory();
        } else {
            this.close();
        }
    }

    prev() {
        this.stopTimer();
        if (this.currentStoryIndex > 0) {
            this.currentStoryIndex--;
            this.showCurrentStory();
        } else {
            this.showCurrentStory(); // Restart current
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.story-item')) {
        window.storyViewer = new StoryViewer();
    }
});
