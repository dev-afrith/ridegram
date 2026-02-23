/**
 * RideGram - Theme Manager
 * Handles dark/light mode toggle with localStorage persistence
 */

(function () {
    'use strict';

    const THEME_KEY = 'ridegram-theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    // Get saved theme or default to light
    function getSavedTheme() {
        return localStorage.getItem(THEME_KEY) || LIGHT;
    }

    // Apply theme to document
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);

        // Update any toggle buttons on the page
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            btn.setAttribute('aria-checked', theme === DARK);
        });
    }

    // Toggle between themes
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || LIGHT;
        const next = current === DARK ? LIGHT : DARK;
        applyTheme(next);

        // Show toast notification
        if (typeof showToast === 'function') {
            showToast(`${next === DARK ? '🌙 Dark' : '☀️ Light'} mode enabled`, 'info');
        }
    }

    // Initialize on page load
    function init() {
        // Apply saved theme immediately
        applyTheme(getSavedTheme());

        // Add click handlers to all theme toggles
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                toggleTheme();
            }
        });

        // Listen for system preference changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem(THEME_KEY)) {
                    applyTheme(e.matches ? DARK : LIGHT);
                }
            });
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose toggle function globally
    window.toggleTheme = toggleTheme;
    window.setTheme = applyTheme;
})();
