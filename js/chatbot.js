/**
 * RideGram - AI Chatbot Component
 * Floating chatbot with predefined responses for ride-related queries
 * 
 * This is a frontend-only demo chatbot.
 * FIREBASE NOTE: Can be replaced with Dialogflow or custom AI service
 */

// ============================================
// CHATBOT DATA - Predefined responses
// ============================================
const chatbotResponses = {
    greetings: [
        "Hey there! 🏍️ I'm RideBot, your riding companion. How can I help you today?",
        "Hello rider! Ready to plan your next adventure? Ask me anything about RideGram!",
        "Hi! I'm here to help you find the perfect ride. What would you like to know?"
    ],

    rides: {
        "how to join": "To join a ride:\n1. Browse the feed or explore page\n2. Click 'Request to Join' on any ride\n3. The organizer will review your profile\n4. Once approved, you'll get full ride details!",
        "create ride": "Creating a ride is easy!\n1. Click the 'Create Ride' button\n2. Fill in route details, dates, and budget\n3. Add your daily itinerary\n4. Publish and wait for riders to join!",
        "find rides": "You can find rides in multiple ways:\n• Check your Feed for latest posts\n• Use the Explore page to search\n• Filter by location, difficulty, or dates\n• Follow riders you like for updates!",
        "safety": "Safety is our priority! 🛡️\n• All riders have public ratings\n• Check reviews before joining\n• Share ride details with family\n• We recommend riding in groups\n• Always wear proper gear!",
    },

    features: {
        "rating": "Our rating system includes:\n⭐ Star ratings (1-5)\n🏷️ Tags like 'Safe Rider', 'Well Planned'\n📝 Written reviews from co-riders\n\nBuild your reputation by completing rides!",
        "privacy": "You control your privacy:\n🔓 Public posts visible to everyone\n🔒 Followers-only for exclusive content\n🔐 Full ride details only for approved members\n\nUpdate settings anytime in your profile!",
        "messages": "Direct Messaging lets you:\n💬 Chat with ride organizers\n📍 Clarify meeting points\n🤝 Connect before committing\n\nFind it in the Messages tab!"
    },

    help: {
        "contact": "Need more help?\n📧 Email: support@ridegram.com\n📱 Help Center in settings\n💬 Or ask me anything here!",
        "report": "To report an issue:\n1. Use the ⋮ menu on any post/profile\n2. Select 'Report'\n3. Our team reviews within 24 hours\n\nYour safety matters to us!"
    },

    fallback: [
        "I'm not sure about that. Try asking about:\n• How to join rides\n• Creating your own ride\n• Safety features\n• Rating system",
        "Hmm, I don't have info on that yet. Can I help you with finding rides, safety tips, or using RideGram features?",
        "Let me learn about that! Meanwhile, try asking about joining rides, privacy settings, or how ratings work."
    ]
};

// ============================================
// CHATBOT INITIALIZATION
// ============================================
function initChatbot() {
    // Create chatbot HTML
    const chatbotHTML = `
        <div class="chatbot-container" id="chatbot">
            <button class="chatbot-toggle" id="chatbot-toggle" aria-label="Open AI Assistant">
                <i class="fas fa-robot"></i>
                <span class="chatbot-badge">1</span>
            </button>
            
            <div class="chatbot-window" id="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <div class="chatbot-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div>
                            <h4>RideBot</h4>
                            <span class="chatbot-status">AI Assistant</span>
                        </div>
                    </div>
                    <button class="chatbot-close" id="chatbot-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="chatbot-messages" id="chatbot-messages">
                    <!-- Messages will be added here -->
                </div>
                
                <div class="chatbot-suggestions" id="chatbot-suggestions">
                    <button class="chatbot-suggestion" data-query="how to join">How to join rides?</button>
                    <button class="chatbot-suggestion" data-query="safety">Safety tips</button>
                    <button class="chatbot-suggestion" data-query="rating">Rating system</button>
                </div>
                
                <div class="chatbot-input-area">
                    <input type="text" id="chatbot-input" placeholder="Ask me anything..." autocomplete="off">
                    <button id="chatbot-send">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add chatbot styles
    const chatbotStyles = `
        <style id="chatbot-styles">
            .chatbot-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                font-family: var(--font);
            }
            
            .chatbot-toggle {
                width: 68px;
                height: 68px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--primary), var(--primary-dark));
                border: none;
                color: white;
                font-size: 32px;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                position: relative;
            }
            
            .chatbot-toggle:hover {
                transform: scale(1.1) rotate(5deg);
                box-shadow: 0 6px 25px rgba(99, 102, 241, 0.5);
            }
            
            .chatbot-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                width: 22px;
                height: 22px;
                background: #F43F5E;
                border-radius: 50%;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid var(--bg-primary);
            }
            
            .chatbot-window {
                position: absolute;
                bottom: 85px;
                right: 0;
                width: 380px;
                height: 520px;
                background: var(--glass-bg);
                backdrop-filter: blur(var(--glass-blur));
                -webkit-backdrop-filter: blur(var(--glass-blur));
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-xl);
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
                display: none;
                flex-direction: column;
                overflow: hidden;
                transform-origin: bottom right;
                transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            .chatbot-window.active {
                display: flex;
            }
            
            .chatbot-header {
                background: linear-gradient(135deg, var(--primary), var(--primary-dark));
                color: white;
                padding: 18px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .chatbot-header-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .chatbot-avatar {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
            }
            
            .chatbot-header h4 {
                margin: 0;
                font-size: 16px;
                font-weight: 700;
                letter-spacing: -0.01em;
            }
            
            .chatbot-status {
                font-size: 12px;
                opacity: 0.9;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            
            .chatbot-status::before {
                content: '';
                width: 6px;
                height: 6px;
                background: #10B981;
                border-radius: 50%;
            }
            
            .chatbot-close {
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .chatbot-close:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: rotate(90deg);
            }
            
            .chatbot-messages {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            
            .chatbot-message {
                max-width: 85%;
                padding: 12px 16px;
                border-radius: 18px;
                font-size: 14px;
                line-height: 1.6;
                white-space: pre-wrap;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            
            .chatbot-message.bot {
                background: var(--bg-card);
                border: 1px solid var(--border);
                align-self: flex-start;
                border-bottom-left-radius: 4px;
                color: var(--text-primary);
            }
            
            .chatbot-message.user {
                background: linear-gradient(135deg, var(--primary), var(--primary-dark));
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 4px;
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
            }
            
            .chatbot-message.typing {
                background: var(--bg-card);
                border: 1px solid var(--border);
                align-self: flex-start;
                padding: 14px 20px;
            }
            
            .typing-dots {
                display: flex;
                gap: 5px;
            }
            
            .typing-dots span {
                width: 6px;
                height: 6px;
                background: var(--text-muted);
                border-radius: 50%;
                animation: bounce 1.4s infinite ease-in-out;
            }
            
            .typing-dots span:nth-child(1) { animation-delay: 0s; }
            .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
            .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
            
            @keyframes bounce {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-6px); }
            }
            
            .chatbot-suggestions {
                padding: 12px 16px;
                display: flex;
                gap: 8px;
                overflow-x: auto;
                scrollbar-width: none;
                border-top: 1px solid var(--border);
            }
            
            .chatbot-suggestions::-webkit-scrollbar { display: none; }
            
            .chatbot-suggestion {
                padding: 8px 14px;
                background: var(--bg-card);
                color: var(--text-secondary);
                border: 1px solid var(--border);
                border-radius: 20px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
                white-space: nowrap;
                font-weight: 500;
            }
            
            .chatbot-suggestion:hover {
                border-color: var(--primary);
                color: var(--primary);
                background: rgba(99, 102, 241, 0.05);
            }
            
            .chatbot-input-area {
                padding: 16px;
                display: flex;
                gap: 12px;
                background: rgba(0, 0, 0, 0.2);
                border-top: 1px solid var(--border);
            }
            
            .chatbot-input-area input {
                flex: 1;
                padding: 12px 18px;
                border: 1px solid var(--border);
                background: var(--bg-input);
                color: var(--text-primary);
                border-radius: 25px;
                font-size: 14px;
                outline: none;
                transition: all 0.2s;
            }
            
            .chatbot-input-area input:focus {
                border-color: var(--primary);
                box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
            }
            
            .chatbot-input-area button {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--primary), var(--primary-dark));
                border: none;
                color: white;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 10px rgba(99, 102, 241, 0.2);
            }
            
            .chatbot-input-area button:hover {
                transform: scale(1.05) translateY(-2px);
                box-shadow: 0 6px 15px rgba(99, 102, 241, 0.3);
            }
            
            @media (max-width: 480px) {
                .chatbot-window {
                    width: calc(100vw - 40px);
                    height: 60vh;
                    bottom: 70px;
                    right: -10px;
                }
            }
        </style>
    `;

    // Inject into page
    document.body.insertAdjacentHTML('beforeend', chatbotStyles);
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Initialize event listeners
    initChatbotEvents();

    // Show initial greeting after a delay
    setTimeout(() => {
        addBotMessage(getRandomResponse(chatbotResponses.greetings));
    }, 1000);
}

// ============================================
// CHATBOT EVENTS
// ============================================
function initChatbotEvents() {
    const toggle = document.getElementById('chatbot-toggle');
    const window = document.getElementById('chatbot-window');
    const close = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input');
    const send = document.getElementById('chatbot-send');
    const badge = document.querySelector('.chatbot-badge');

    // Toggle chatbot window
    toggle.addEventListener('click', () => {
        window.classList.toggle('active');
        if (window.classList.contains('active')) {
            window.classList.add('animate-springIn');
        }
        badge.style.display = 'none';
    });

    // Close chatbot
    close.addEventListener('click', () => {
        window.classList.remove('active');
    });

    // Send message on button click
    send.addEventListener('click', sendUserMessage);

    // Send message on Enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });

    // Quick suggestion buttons
    document.querySelectorAll('.chatbot-suggestion').forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.dataset.query;
            document.getElementById('chatbot-input').value = btn.textContent;
            sendUserMessage();
        });
    });
}

// ============================================
// MESSAGE HANDLING
// ============================================
function sendUserMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    addUserMessage(message);
    input.value = '';

    // Show typing indicator
    showTyping();

    // Generate response after delay
    setTimeout(() => {
        hideTyping();
        const response = generateResponse(message);
        addBotMessage(response);
    }, 1000 + Math.random() * 500);
}

function addUserMessage(text) {
    const container = document.getElementById('chatbot-messages');
    container.insertAdjacentHTML('beforeend', `
        <div class="chatbot-message user animate-springIn">${escapeHtml(text)}</div>
    `);
    scrollToBottom();
}

function addBotMessage(text) {
    const container = document.getElementById('chatbot-messages');
    container.insertAdjacentHTML('beforeend', `
        <div class="chatbot-message bot animate-springIn">${escapeHtml(text)}</div>
    `);
    scrollToBottom();
}

function showTyping() {
    const container = document.getElementById('chatbot-messages');
    container.insertAdjacentHTML('beforeend', `
        <div class="chatbot-message typing" id="typing-indicator">
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        </div>
    `);
    scrollToBottom();
}

function hideTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

function scrollToBottom() {
    const container = document.getElementById('chatbot-messages');
    container.scrollTop = container.scrollHeight;
}

// ============================================
// RESPONSE GENERATION
// ============================================
function generateResponse(userMessage) {
    const msg = userMessage.toLowerCase();

    // Check for greetings
    if (msg.match(/^(hi|hello|hey|good morning|good evening)/)) {
        return getRandomResponse(chatbotResponses.greetings);
    }

    // Check rides queries
    if (msg.includes('join') && msg.includes('ride')) {
        return chatbotResponses.rides['how to join'];
    }
    if (msg.includes('create') || msg.includes('new ride') || msg.includes('plan')) {
        return chatbotResponses.rides['create ride'];
    }
    if (msg.includes('find') || msg.includes('search') || msg.includes('explore')) {
        return chatbotResponses.rides['find rides'];
    }
    if (msg.includes('safe') || msg.includes('security')) {
        return chatbotResponses.rides['safety'];
    }

    // Check features
    if (msg.includes('rating') || msg.includes('review') || msg.includes('star')) {
        return chatbotResponses.features['rating'];
    }
    if (msg.includes('privacy') || msg.includes('public') || msg.includes('private')) {
        return chatbotResponses.features['privacy'];
    }
    if (msg.includes('message') || msg.includes('chat') || msg.includes('dm')) {
        return chatbotResponses.features['messages'];
    }

    // Check help
    if (msg.includes('contact') || msg.includes('support') || msg.includes('email')) {
        return chatbotResponses.help['contact'];
    }
    if (msg.includes('report') || msg.includes('issue') || msg.includes('problem')) {
        return chatbotResponses.help['report'];
    }

    // Thanks
    if (msg.includes('thank') || msg.includes('thanks')) {
        return "You're welcome! 🏍️ Safe riding! Let me know if you need anything else.";
    }

    // Fallback
    return getRandomResponse(chatbotResponses.fallback);
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// AUTO-INITIALIZE ON DOM READY
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}
