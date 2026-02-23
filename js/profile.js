/**
 * RideGram - Profile Page JavaScript
 * Handles profile display, post grid, and ride details modal
 * 
 * FIREBASE NOTE: Replace data.js calls with Firestore queries
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const loggedInUser = checkAuthState();
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    // Get profile user from URL or show logged-in user
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('user') || loggedInUser.username;

    const profileUser = getUserByUsername(username);
    if (profileUser) {
        renderProfile(profileUser, loggedInUser);
    } else {
        // Fallback to logged-in user
        renderProfile(loggedInUser, loggedInUser);
    }
});

// ============================================
// RENDER PROFILE
// ============================================
function renderProfile(user, loggedInUser) {
    const isOwnProfile = user.id === loggedInUser.id;

    // Update page title
    document.title = `${user.name} (@${user.username}) - RideGram`;

    // Render header
    renderProfileHeader(user, isOwnProfile);

    // Render posts
    renderProfilePosts(user);

    // Initialize interactions
    initProfileInteractions(user);
}

function renderProfileHeader(user, isOwnProfile) {
    const header = document.getElementById('profile-header');
    if (!header) return;

    header.innerHTML = `
        <div class="profile-avatar-section">
            <img src="${user.avatar}" alt="${user.name}" class="profile-avatar">
        </div>
        
        <div class="profile-info">
            <div class="profile-top-row">
                <h1 class="profile-username">
                    ${user.username}
                    ${user.isVerified ? '<i class="fas fa-check-circle verified" title="Verified"></i>' : ''}
                </h1>
                <div class="profile-actions">
                    ${isOwnProfile ? `
                        <button class="btn btn-secondary">Edit Profile</button>
                        <button class="btn btn-icon btn-ghost"><i class="fas fa-cog"></i></button>
                    ` : `
                        <button class="btn btn-primary follow-btn">Follow</button>
                        <button class="btn btn-secondary">Message</button>
                        <button class="btn btn-icon btn-ghost"><i class="fas fa-ellipsis-h"></i></button>
                    `}
                </div>
            </div>
            
            <div class="profile-stats">
                <div class="profile-stat">
                    <span class="profile-stat-value">${user.completedRides}</span>
                    <span class="profile-stat-label">Rides</span>
                </div>
                <div class="profile-stat">
                    <span class="profile-stat-value">${formatNumber(user.followers)}</span>
                    <span class="profile-stat-label">Followers</span>
                </div>
                <div class="profile-stat">
                    <span class="profile-stat-value">${formatNumber(user.following)}</span>
                    <span class="profile-stat-label">Following</span>
                </div>
            </div>
            
            <div class="profile-name">${user.name}</div>
            <p class="profile-bio">${user.bio}</p>
            
            <div class="profile-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${user.location}</span>
            </div>
            
            <div class="profile-rating">
                <span class="profile-rating-stars">
                    <i class="fas fa-star"></i>
                    <span class="profile-rating-value">${user.rating}</span>
                </span>
                <span class="profile-rating-count">(${user.totalRatings} ratings)</span>
                <div class="profile-tags">
                    ${user.tags.map(tag => `
                        <span class="tag tag-primary">${tag}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="profile-bike">
                <i class="fas fa-motorcycle"></i>
                <span><strong>${user.bike.model}</strong> • ${user.bike.cc}cc</span>
            </div>
        </div>
    `;
}

function renderProfilePosts(user) {
    const grid = document.getElementById('posts-grid');
    if (!grid) return;

    const userPosts = getPostsByUserId(user.id);

    if (userPosts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
                <i class="fas fa-camera" style="font-size: 3rem; margin-bottom: 16px;"></i>
                <h3>No Posts Yet</h3>
                <p>When ${user.name} shares rides, they'll appear here.</p>
            </div>
        `;
        return;
    }

    userPosts.forEach(post => {
        const ride = getRideById(post.rideId);

        grid.insertAdjacentHTML('beforeend', `
            <div class="post-grid-item" data-post-id="${post.id}" data-ride-id="${post.rideId}">
                <img src="${post.image}" alt="Ride post">
                
                <span class="post-grid-privacy ${post.privacy === 'public' ? 'privacy-public' : 'privacy-followers'}">
                    <i class="fas fa-${post.privacy === 'public' ? 'unlock' : 'lock'}"></i>
                    ${post.privacy === 'public' ? 'Public' : 'Followers'}
                </span>
                
                <div class="post-grid-overlay">
                    <div class="post-grid-stats">
                        <span><i class="fas fa-heart"></i> ${formatNumber(post.likes)}</span>
                        <span><i class="fas fa-comment"></i> ${formatNumber(post.comments)}</span>
                    </div>
                </div>
                
                <div class="post-grid-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${post.location}</span>
                </div>
            </div>
        `);
    });
}

// ============================================
// PROFILE INTERACTIONS
// ============================================
function initProfileInteractions(user) {
    // Follow button
    const followBtn = document.querySelector('.follow-btn');
    if (followBtn) {
        followBtn.addEventListener('click', () => {
            if (followBtn.classList.contains('following')) {
                followBtn.classList.remove('following');
                followBtn.textContent = 'Follow';
                followBtn.classList.remove('btn-secondary');
                followBtn.classList.add('btn-primary');
            } else {
                followBtn.classList.add('following');
                followBtn.textContent = 'Following';
                followBtn.classList.remove('btn-primary');
                followBtn.classList.add('btn-secondary');
            }

            /*
             * FIREBASE INTEGRATION POINT:
             * Update followers in Firestore:
             * 
             * const userRef = db.collection('users').doc(user.id);
             * const currentUserRef = db.collection('users').doc(currentUser.id);
             * 
             * // Use batch write for consistency
             * const batch = db.batch();
             * batch.update(userRef, { followers: increment });
             * batch.update(currentUserRef, { following: increment });
             * await batch.commit();
             */
        });
    }

    // Post grid items - show ride details
    document.querySelectorAll('.post-grid-item').forEach(item => {
        item.addEventListener('click', () => {
            const rideId = item.dataset.rideId;
            if (rideId) {
                openRideDetailsModal(rideId, user);
            }
        });
    });

    // Tab switching
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}

// ============================================
// RIDE DETAILS MODAL
// ============================================
function openRideDetailsModal(rideId, profileUser) {
    const ride = getRideById(rideId);
    if (!ride) return;

    const loggedInUser = checkAuthState();
    const isJoined = ride.participants.includes(loggedInUser?.id);
    const isCreator = ride.creatorId === loggedInUser?.id;
    const canViewDetails = isJoined || isCreator;

    const modal = document.getElementById('ride-details-modal');
    const content = modal.querySelector('.modal-body');

    content.innerHTML = `
        <div class="ride-details-header">
            <div class="ride-details-icon">
                <i class="fas fa-route"></i>
            </div>
            <div class="ride-details-title">
                <h3>${ride.title}</h3>
                <div class="ride-details-route">
                    <span>${ride.summary.from}</span>
                    <i class="fas fa-arrow-right"></i>
                    <span>${ride.summary.to}</span>
                </div>
            </div>
        </div>
        
        <div class="ride-summary-card">
            <div class="ride-summary-grid">
                <div class="ride-summary-item">
                    <i class="fas fa-road"></i>
                    <h4>${ride.summary.totalKm} km</h4>
                    <span>Total Distance</span>
                </div>
                <div class="ride-summary-item">
                    <i class="fas fa-calendar-alt"></i>
                    <h4>${ride.summary.days} Days</h4>
                    <span>Duration</span>
                </div>
                <div class="ride-summary-item">
                    <i class="fas fa-users"></i>
                    <h4>${ride.participants.length}/${ride.maxParticipants}</h4>
                    <span>Riders</span>
                </div>
            </div>
        </div>
        
        ${canViewDetails ? renderFullRideDetails(ride) : renderLockedRideDetails()}
    `;

    openModal('ride-details-modal');
}

function renderFullRideDetails(ride) {
    const details = ride.fullDetails;
    if (!details) return '';

    return `
        <div class="ride-full-details">
            ${details.dailyPlan ? `
                <div class="ride-detail-section">
                    <h4><i class="fas fa-map-marked-alt"></i> Daily Itinerary</h4>
                    ${details.dailyPlan.map(day => `
                        <div class="ride-day-item">
                            <div class="ride-day-number">${day.day}</div>
                            <div class="ride-day-info">
                                <h5>${day.title}</h5>
                                <p>
                                    <i class="fas fa-road"></i> ${day.distance} • 
                                    <i class="fas fa-hotel"></i> ${day.hotel} • 
                                    <i class="fas fa-rupee-sign"></i> ${day.cost || day.estimatedCost}
                                </p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="ride-detail-section">
                <h4><i class="fas fa-wallet"></i> Budget</h4>
                <p style="font-size: 1.25rem; font-weight: 600; color: var(--primary-orange);">
                    ${details.totalBudget}
                </p>
            </div>
            
            <div class="ride-detail-section">
                <h4><i class="fas fa-map-pin"></i> Meeting Point</h4>
                <p>${details.meetingPoint}</p>
            </div>
        </div>
    `;
}

function renderLockedRideDetails() {
    return `
        <div class="ride-locked-message">
            <i class="fas fa-lock"></i>
            <h4>Full Details Locked</h4>
            <p>Request to join this ride to see the complete itinerary, hotel details, and budget breakdown.</p>
            <button class="btn btn-primary" style="margin-top: 16px;">
                <i class="fas fa-paper-plane"></i> Request to Join
            </button>
        </div>
    `;
}

// Format number helper
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}
