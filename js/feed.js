/**
 * RideGram - Feed Page JavaScript
 * Renders feed posts, stories, sidebar, and handles interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    const user = checkAuthState();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    initFeed();
    initStories();
    initSuggestions();
});

// ============================================
// RENDER FEED
// ============================================
function initFeed() {
    const container = document.getElementById('feed-posts');
    if (!container) return;
    const feedPosts = getFeedPosts();
    container.innerHTML = feedPosts.map(post => createPostCard(post)).join('');
    initPostInteractions();
}

function createPostCard(post) {
    let user = getUserById(post.userId);
    // Fallback if user ID mismatch (e.g. legacy bugged data)
    if (!user) {
        user = (typeof currentUser !== 'undefined' && currentUser) ? currentUser : users[0];
    }
    const ride = post.rideId ? getRideById(post.rideId) : null;
    const stars = Math.floor(user.rating);
    const halfStar = user.rating % 1 >= 0.5;
    const starsHtml = '★'.repeat(stars) + (halfStar ? '½' : '');

    return `
    <article class="post-card" data-post-id="${post.id}">
        <div class="post-header">
            <a href="profile.html"><img src="${user.avatar}" class="post-avatar" alt="${user.name}"></a>
            <div class="post-user-info">
                <div class="post-user-name">
                    ${user.name}
                    ${user.isVerified ? '<i class="fas fa-check-circle verified"></i>' : ''}
                </div>
                <div class="post-username">@${user.username} · ${user.location}</div>
            </div>
            <div class="post-menu-container">
                <button class="post-menu" onclick="togglePostMenu(this)"><i class="fas fa-ellipsis-h"></i></button>
                <div class="post-menu-dropdown">
                    <div class="post-menu-item" onclick="showToast('Share link copied!','success')"><i class="fas fa-share-alt"></i> Share</div>
                    <div class="post-menu-item" onclick="showToast('Post reported','info')"><i class="fas fa-flag"></i> Report</div>
                    ${user.id === (currentUser ? currentUser.id : 'user_001') ? `<div class="post-menu-item danger" onclick="openDeleteModal('${post.id}')"><i class="fas fa-trash"></i> Delete</div>` : ''}
                </div>
            </div>
        </div>

        ${ride ? `
        <div class="post-ride-summary">
            <div class="ride-route">
                <i class="fas fa-map-marker-alt"></i>
                ${ride.summary.from}
                <i class="fas fa-arrow-right" style="color:var(--primary);font-size:10px;"></i>
                ${ride.summary.to}
            </div>
            <div class="ride-name">${ride.title}</div>
            <div class="ride-meta">
                <span><i class="fas fa-road"></i> ${ride.summary.totalKm} km</span>
                <span><i class="fas fa-calendar"></i> ${ride.summary.days} days</span>
                <span><i class="fas fa-users"></i> ${ride.participants.length}/${ride.maxParticipants}</span>
            </div>
        </div>
        ` : ''}

        <img src="${post.image}" class="post-image" alt="Post" loading="lazy">

        <div class="post-actions">
            <button class="post-action-btn like-btn ${post.isLiked ? 'liked' : ''}" data-post-id="${post.id}">
                <i class="${post.isLiked ? 'fas' : 'far'} fa-heart"></i>
                <span class="like-count">${formatNum(post.likes)}</span>
            </button>
            <button class="post-action-btn" onclick="openCommentsModal('${post.id}')">
                <i class="far fa-comment"></i>
                <span>${formatNum(post.comments)}</span>
            </button>
            <button class="post-action-btn" onclick="showToast('Shared!','success')">
                <i class="far fa-paper-plane"></i>
            </button>
            <button class="post-action-btn" onclick="this.querySelector('i').classList.toggle('fas');this.querySelector('i').classList.toggle('far');showToast(this.querySelector('i').classList.contains('fas')?'Post saved!':'Post unsaved','info')" style="margin-left:auto;">
                <i class="far fa-bookmark"></i>
            </button>
            ${ride ? `<button class="post-action-join" onclick="openJoinModal('${post.id}')">Join Ride</button>` : ''}
        </div>

        <div class="post-caption">
            <p><strong>${user.username}</strong> ${post.caption}</p>
            <div class="post-location"><i class="fas fa-map-marker-alt"></i> ${post.location}</div>
        </div>
        <div class="post-time">${formatRelativeTime(post.createdAt)}</div>
    </article>`;
}

// ============================================
// STORIES
// ============================================
function initStories() {
    const container = document.getElementById('stories-container');
    if (!container) return;
    const currentUser = checkAuthState();
    let html = `
        <div class="story-item" onclick="showToast('Add your story!','info')">
            <div class="story-avatar-wrapper" style="background:var(--border);position:relative;">
                <img src="${currentUser ? currentUser.avatar : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}" class="story-avatar" alt="Your Story">
            </div>
            <div class="story-username">Your Story</div>
        </div>`;
    stories.forEach(story => {
        const storyUser = getUserById(story.userId);
        if (!storyUser) return;
        html += `
            <div class="story-item" onclick="viewStory('${story.id}')">
                <div class="story-avatar-wrapper ${story.viewed ? 'viewed' : ''}">
                    <img src="${storyUser.avatar}" class="story-avatar" alt="${storyUser.name}">
                </div>
                <div class="story-username">${storyUser.name.split(' ')[0]}</div>
            </div>`;
    });
    container.innerHTML = html;
}

function viewStory(storyId) {
    const story = stories.find(s => s.id === storyId);
    if (!story) return;
    story.viewed = true;
    const storyUser = getUserById(story.userId);
    // Simple full-screen story view
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:#000;z-index:9999;display:flex;align-items:center;justify-content:center;cursor:pointer;';
    overlay.innerHTML = `
        <div style="position:absolute;top:16px;left:16px;display:flex;align-items:center;gap:8px;z-index:2;">
            <img src="${storyUser.avatar}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid var(--primary);" alt="">
            <div>
                <div style="font-weight:600;font-size:14px;color:#fff;">${storyUser.name}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.6);">Just now</div>
            </div>
        </div>
        <button style="position:absolute;top:16px;right:16px;background:none;border:none;color:#fff;font-size:20px;cursor:pointer;z-index:2;" onclick="event.stopPropagation();this.parentElement.remove();">
            <i class="fas fa-times"></i>
        </button>
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:rgba(255,255,255,0.2);"><div style="height:100%;background:var(--primary);animation:storyProgress 5s linear forwards;"></div></div>
        <img src="${story.image}" style="max-width:100%;max-height:100%;object-fit:contain;" alt="">
    `;
    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay);
    // Add progress animation
    const style = document.createElement('style');
    style.textContent = '@keyframes storyProgress { from { width: 0; } to { width: 100%; } }';
    overlay.appendChild(style);
    // Auto-close after 5s
    setTimeout(() => { if (overlay.parentElement) overlay.remove(); }, 5000);
    initStories(); // refresh to mark as viewed
}

// ============================================
// SUGGESTIONS
// ============================================
function initSuggestions() {
    const container = document.getElementById('suggestions-list');
    if (!container) return;
    const currentU = checkAuthState();
    const suggestions = users.filter(u => u.id !== (currentU ? currentU.id : '')).slice(0, 4);
    container.innerHTML = suggestions.map(u => `
        <div class="suggestion-item">
            <img src="${u.avatar}" class="suggestion-avatar" alt="${u.name}">
            <div class="suggestion-info">
                <div class="suggestion-name">${u.name}</div>
                <div class="suggestion-meta">${u.bike.model}</div>
            </div>
            <span class="suggestion-follow" onclick="this.textContent=this.textContent==='Follow'?'Following':'Follow';showToast(this.textContent==='Following'?'Followed!':'Unfollowed','success')">Follow</span>
        </div>
    `).join('');
}

// ============================================
// POST INTERACTIONS
// ============================================
function initPostInteractions() {
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', handleLike);
    });
}

function handleLike(e) {
    const btn = e.currentTarget;
    const postId = btn.dataset.postId;
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
    const icon = btn.querySelector('i');
    const count = btn.querySelector('.like-count');
    if (post.isLiked) {
        btn.classList.add('liked');
        icon.className = 'fas fa-heart';
        icon.style.animation = 'heartBeat 0.6s ease';
    } else {
        btn.classList.remove('liked');
        icon.className = 'far fa-heart';
        icon.style.animation = '';
    }
    count.textContent = formatNum(post.likes);
}

function openJoinModal(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const ride = getRideById(post.rideId);
    if (!ride) return;
    document.getElementById('join-modal-ride-title').textContent = ride.title;
    document.getElementById('join-modal-ride-info').innerHTML = `
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;font-weight:600;">
            <i class="fas fa-map-marker-alt" style="color:var(--primary);"></i>
            ${ride.summary.from} → ${ride.summary.to}
        </div>
        <div style="font-size:12px;color:var(--text-muted);display:flex;gap:12px;">
            <span><i class="fas fa-road"></i> ${ride.summary.totalKm} km</span>
            <span><i class="fas fa-calendar"></i> ${ride.summary.days} days</span>
            <span><i class="fas fa-users"></i> ${ride.participants.length}/${ride.maxParticipants}</span>
        </div>`;
    openModal('join-modal');
}

function confirmJoinRequest() {
    closeModal('join-modal');
    showToast('Join request sent! 🏍️ Ride creator will review.', 'success');
}
window.confirmJoinRequest = confirmJoinRequest;

function formatNum(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// ============================================
// NEW FEATURES: COMMENTS & DELETION
// ============================================
let activePostId = null;

function togglePostMenu(btn) {
    const dropdown = btn.nextElementSibling;
    const allDropdowns = document.querySelectorAll('.post-menu-dropdown');
    allDropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('active'); });
    dropdown.classList.toggle('active');
}
window.togglePostMenu = togglePostMenu;

function openDeleteModal(postId) {
    activePostId = postId;
    openModal('delete-modal');
    document.querySelectorAll('.post-menu-dropdown').forEach(d => d.classList.remove('active'));
}
window.openDeleteModal = openDeleteModal;

function confirmDelete() {
    if (!activePostId) return;
    const postIdx = posts.findIndex(p => p.id === activePostId);
    if (postIdx > -1) {
        posts.splice(postIdx, 1);
        initFeed();
        showToast('Post deleted successfully', 'success');
    }
    closeModal('delete-modal');
}
window.confirmDelete = confirmDelete;

function openCommentsModal(postId) {
    activePostId = postId;
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const list = document.getElementById('comments-list');
    // Using dummy comments for demo
    const dummyComments = [
        { user: 'ttf_vasan', text: 'Amazing ride! Can I join next time?' },
        { user: 'ajith_rider15', text: 'The route looks insane. 🏍️' }
    ];

    list.innerHTML = dummyComments.map(c => `
        <div style="margin-bottom: 12px; font-size: var(--fs-sm);">
            <strong>@${c.user}</strong> ${c.text}
        </div>
    `).join('');

    openModal('comment-modal');
}
window.openCommentsModal = openCommentsModal;

function handleAddComment() {
    const input = document.getElementById('comment-input');
    const text = input.value.trim();
    if (!text) return;

    const list = document.getElementById('comments-list');
    const newComment = document.createElement('div');
    newComment.style.marginBottom = '12px';
    newComment.style.fontSize = 'var(--fs-sm)';
    newComment.innerHTML = `<strong>@${currentUser.username}</strong> ${text}`;
    list.appendChild(newComment);

    // Update post count
    const post = posts.find(p => p.id === activePostId);
    if (post) post.comments++;

    input.value = '';
    showToast('Comment posted!', 'success');
}
window.handleAddComment = handleAddComment;

// Close menus when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.post-menu-container')) {
        document.querySelectorAll('.post-menu-dropdown').forEach(d => d.classList.remove('active'));
    }
});
