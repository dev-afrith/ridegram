/**
 * RideGram - Advanced Core v2.0
 * Modular, performance-optimized architectural backbone.
 */

class RideGramCore {
    static state = {
        currentUser: null,
        initialized: false
    };

    static init() {
        if (this.state.initialized) return;

        console.log('🚀 RideGramCore Initializing...');
        this.loadUser();
        this.initSidebar();
        this.initInteractions();
        this.initScrollAnimations();

        this.state.initialized = true;
    }

    static loadUser() {
        this.state.currentUser = JSON.parse(localStorage.getItem('currentUser')) ||
            (typeof users !== 'undefined' ? users[0] : null);
    }

    // ============================================
    // DYNAMIC COMPONENTS
    // ============================================

    static initSidebar() {
        const container = document.getElementById('global-sidebar');
        if (!container) return;

        const user = this.state.currentUser;
        const page = window.location.pathname.split('/').pop() || 'index.html';

        container.innerHTML = `
            <div class="sidebar">
                <div class="sidebar-profile">
                    <img src="${user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}" 
                         class="sidebar-profile-avatar" alt="Profile">
                    <div class="sidebar-profile-info">
                        <h4>${user?.name || 'Vasan Kumar'}</h4>
                        <span>@${user?.username || 'ttf_vasan'}</span>
                    </div>
                </div>
                <nav class="sidebar-nav">
                    ${this.renderNavItems(page)}
                </nav>
            </div>
        `;
    }

    static renderNavItems(activePage) {
        const navLinks = [
            { href: 'feed.html', icon: 'fa-home', label: 'Feed' },
            { href: 'explore.html', icon: 'fa-compass', label: 'Explore' },
            { href: 'create-ride.html', icon: 'fa-plus-circle', label: 'Create Ride', primary: true },
            { href: 'my-rides.html', icon: 'fa-route', label: 'My Rides' },
            { href: 'garage.html', icon: 'fa-motorcycle', label: 'Garage' },
            { href: 'saved.html', icon: 'fa-bookmark', label: 'Saved' },
            { href: 'messages.html', icon: 'fa-comment-dots', label: 'Messages' },
            { href: 'profile.html', icon: 'fa-user', label: 'Profile' },
            { href: 'settings.html', icon: 'fa-cog', label: 'Settings' }
        ];

        return navLinks.map(link => `
            <a href="${link.href}" class="sidebar-nav-item ${activePage === link.href ? 'active' : ''}" 
               ${link.primary ? 'style="color:var(--primary); font-weight:700;"' : ''}>
                <i class="fas ${link.icon}"></i> ${link.label}
            </a>
        `).join('');
    }

    // ============================================
    // UNIVERSAL UI LOGIC (Event Delegation)
    // ============================================

    static initInteractions() {
        document.addEventListener('click', (e) => {
            const target = e.target;

            // Modal Toggles
            if (target.dataset.modalOpen) this.toggleModal(target.dataset.modalOpen, true);
            if (target.dataset.modalClose) this.toggleModal(target.dataset.modalClose, false);

            // Like/Save Logic
            const actionBtn = target.closest('.btn-like, .btn-save, .post-action');
            if (actionBtn) this.handleMicroInteraction(actionBtn);

            // Tab Switches
            if (target.classList.contains('tab')) this.handleTabs(target);

            // Visual Haptics for all buttons
            const anyBtn = target.closest('.btn, .sidebar-nav-item, .bottom-nav-item, .chatbot-toggle');
            if (anyBtn) this.applyVisualHaptic(anyBtn);
        });

        // Form Handling
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        });
    }

    static applyVisualHaptic(el) {
        el.style.transform = 'scale(0.95)';
        el.style.transition = 'transform 0.1s var(--spring-ease)';
        setTimeout(() => {
            el.style.transform = '';
        }, 100);
    }

    static handleMicroInteraction(btn) {
        const icon = btn.querySelector('i');
        if (!icon) return;

        const isLiked = icon.classList.contains('fas');
        icon.classList.toggle('far', isLiked);
        icon.classList.toggle('fas', !isLiked);

        if (icon.classList.contains('fa-heart')) {
            icon.style.color = isLiked ? '' : 'var(--primary)';
            if (!isLiked) this.showToast('Liked!', 'success');
        } else if (icon.classList.contains('fa-bookmark')) {
            if (!isLiked) this.showToast('Saved to collection', 'success');
        }

        // Advanced haptic-like scaling animation
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = '', 150);
    }

    static toggleModal(id, show) {
        const modal = document.getElementById(id);
        if (!modal) return;

        modal.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : '';

        if (show) {
            modal.querySelector('.modal-content')?.classList.add('animate-springIn');
        }
    }

    static handleTabs(tab) {
        const container = tab.closest('.tabs-parent') || tab.parentElement.parentElement;
        const targetId = tab.dataset.tab;

        container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        container.querySelectorAll('.tab-content, .tab-panel').forEach(pane => {
            pane.style.display = pane.id === targetId ? 'block' : 'none';
        });
    }

    static handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        setTimeout(() => {
            this.showToast('Action successful!', 'success');
            btn.innerHTML = original;
            btn.disabled = false;

            if (window.location.href.includes('login.html')) window.location.href = 'feed.html';
        }, 1200);
    }

    // ============================================
    // MOTION & FEEDBACK
    // ============================================

    static initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-reveal');
                        entry.target.style.opacity = '1';
                    }, index * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.post-card, .ride-card, .feature-card, .animate-on-scroll').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    static showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} animate-springIn`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
}

// Global Aliases for Compatibility
const showToast = (m, t) => RideGramCore.showToast(m, t);
const initGlobalSidebar = () => RideGramCore.initSidebar();

document.addEventListener('DOMContentLoaded', () => RideGramCore.init());
