/**
 * RideGram - Login Page JavaScript
 * Handles tab switching and dummy login validation
 * 
 * FIREBASE NOTE: Replace simulateLogin with Firebase Authentication
 * - Email/Password: firebase.auth().signInWithEmailAndPassword()
 * - Phone: firebase.auth().signInWithPhoneNumber()
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoginTabs();
    initLoginForms();
});

// ============================================
// TAB SWITCHING
// ============================================
function initLoginTabs() {
    const tabs = document.querySelectorAll('.login-tab');
    const forms = document.querySelectorAll('.login-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetForm = tab.dataset.form;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active form
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === targetForm) {
                    form.classList.add('active');
                }
            });

            // Clear any error messages
            hideError();
        });
    });
}

// ============================================
// FORM HANDLING
// ============================================
function initLoginForms() {
    // Email Login Form
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', handleEmailLogin);
    }

    // Mobile Login Form
    const mobileForm = document.getElementById('mobile-form');
    if (mobileForm) {
        mobileForm.addEventListener('submit', handleMobileLogin);
    }
}

function handleEmailLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Show loading state
    const btn = e.target.querySelector('.login-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    btn.disabled = true;

    // Simulate network delay
    setTimeout(() => {
        /*
         * FIREBASE INTEGRATION POINT:
         * Replace this with:
         * 
         * firebase.auth().signInWithEmailAndPassword(email, password)
         *   .then((userCredential) => {
         *     window.location.href = 'feed.html';
         *   })
         *   .catch((error) => {
         *     showError(error.message);
         *   });
         */

        const result = simulateLogin('email', { email, password });

        if (result.success) {
            window.location.href = 'feed.html';
        } else {
            showError('Invalid email or password. Try: example@gmail.com / example');
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }, 1000);
}

function handleMobileLogin(e) {
    e.preventDefault();

    const mobile = document.getElementById('mobile').value.trim();
    const password = document.getElementById('mobile-password').value;

    // Show loading state
    const btn = e.target.querySelector('.login-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    btn.disabled = true;

    // Simulate network delay
    setTimeout(() => {
        /*
         * FIREBASE INTEGRATION POINT:
         * Replace this with Firebase Phone Auth:
         * 
         * const phoneNumber = '+91' + mobile;
         * firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
         *   .then((confirmationResult) => {
         *     // Prompt for OTP
         *   });
         */

        const result = simulateLogin('mobile', { mobile, password });

        if (result.success) {
            window.location.href = 'feed.html';
        } else {
            showError('Invalid mobile or password. Try: 1234 / 1234');
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }, 1000);
}

// ============================================
// ERROR HANDLING
// ============================================
function showError(message) {
    const errorEl = document.querySelector('.error-message');
    if (errorEl) {
        errorEl.querySelector('span').textContent = message;
        errorEl.classList.add('show');
    }
}

function hideError() {
    const errorEl = document.querySelector('.error-message');
    if (errorEl) {
        errorEl.classList.remove('show');
    }
}
