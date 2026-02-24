/**
 * RideGram - Dummy Data Module
 * Contains all mock data for users, posts, rides, and stories
 * 
 * FIREBASE NOTE: Replace arrays with Firestore collections when integrating
 */

// ============================================
// USER DATA
// ============================================
const users = [
    {
        id: 'user_001',
        username: 'ttf_vasan',
        name: 'Vasan Kumar',
        email: 'vasan@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
        bio: 'Solo rider | 50,000+ km covered | Living life one ride at a time 🏍️',
        bike: { model: 'Royal Enfield Himalayan', cc: 411 },
        location: 'Chennai, Tamil Nadu',
        rating: 4.8,
        totalRatings: 127,
        tags: ['Safe Rider', 'Well Planned', 'Friendly'],
        completedRides: 45,
        followers: 2340,
        following: 189,
        isVerified: true,
    },
    {
        id: 'user_002',
        username: 'ajith_rider15',
        name: 'Ajith Prasad',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
        bio: 'Adventure seeker | Mountain roads are my calling 🏔️',
        bike: { model: 'KTM Duke 390', cc: 390 },
        location: 'Bangalore, Karnataka',
        rating: 4.6,
        totalRatings: 89,
        tags: ['Fast Rider', 'Experienced', 'Night Owl'],
        completedRides: 32,
        followers: 1567,
        following: 234,
        isVerified: false,
    },
    {
        id: 'user_003',
        username: 'afrith_15',
        name: 'Afrith Khan',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
        bio: 'Weekend warrior | Coffee & curves enthusiast ☕🛣️',
        bike: { model: 'Bajaj Dominar 400', cc: 400 },
        location: 'Hyderabad, Telangana',
        rating: 4.9,
        totalRatings: 156,
        tags: ['Safe Rider', 'Punctual', 'Great Company'],
        completedRides: 67,
        followers: 3210,
        following: 145,
        isVerified: true,
    },
    {
        id: 'user_004',
        username: 'priya_rides',
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
        bio: 'Breaking stereotypes one ride at a time 💪 Solo female rider',
        bike: { model: 'Honda CB350', cc: 350 },
        location: 'Mumbai, Maharashtra',
        rating: 4.7,
        totalRatings: 98,
        tags: ['Safe Rider', 'Inspiring', 'Helpful'],
        completedRides: 28,
        followers: 4521,
        following: 312,
        isVerified: true,
    },
    {
        id: 'user_005',
        username: 'rocky_trails',
        name: 'Rajesh Menon',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
        bio: 'Off-road enthusiast | Every trail tells a story',
        bike: { model: 'Hero XPulse 200', cc: 200 },
        location: 'Kochi, Kerala',
        rating: 4.5,
        totalRatings: 72,
        tags: ['Adventure Seeker', 'Off-road Expert', 'Patient'],
        completedRides: 41,
        followers: 1890,
        following: 267,
        isVerified: false,
    }
];

// ============================================
// POSTS DATA
// ============================================
const posts = [
    {
        id: 'post_001', userId: 'user_001', type: 'ride', rideId: 'ride_001',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        caption: "Just completed an amazing 3-day ride through the Western Ghats! 🏍️🌄",
        likes: 234, comments: 45, shares: 12, isLiked: false, privacy: 'public',
        createdAt: '2024-01-25T14:30:00', location: 'Ooty, Tamil Nadu',
    },
    {
        id: 'post_002', userId: 'user_003', type: 'ride', rideId: 'ride_002',
        image: 'https://images.unsplash.com/photo-1568772585407-9361bd37ec91?w=800&h=600&fit=crop',
        caption: "Coastal roads hit different! 🌊 Completed the Konkan coast ride!",
        likes: 567, comments: 89, shares: 34, isLiked: true, privacy: 'public',
        createdAt: '2024-01-24T18:45:00', location: 'Gokarna, Karnataka',
    },
    {
        id: 'post_003', userId: 'user_002', type: 'ride', rideId: 'ride_003',
        image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop',
        caption: "Night rides through the city lights ✨ Best therapy ever!",
        likes: 412, comments: 67, shares: 23, isLiked: false, privacy: 'public',
        createdAt: '2024-01-23T23:15:00', location: 'Bangalore, Karnataka',
    },
    {
        id: 'post_004', userId: 'user_004', type: 'ride', rideId: 'ride_004',
        image: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&h=600&fit=crop',
        caption: "Ladakh calling! 🏔️ Join my upcoming solo ride - 20 days, 4000+ km!",
        likes: 892, comments: 156, shares: 78, isLiked: true, privacy: 'public',
        createdAt: '2024-01-22T10:00:00', location: 'Leh, Ladakh',
    },
    {
        id: 'post_005', userId: 'user_005', type: 'ride', rideId: 'ride_005',
        image: 'https://images.unsplash.com/photo-1590845947670-c009801ffa74?w=800&h=600&fit=crop',
        caption: "Off the beaten path today! Found an amazing hidden trail 🌲",
        likes: 345, comments: 52, shares: 18, isLiked: false, privacy: 'followers',
        createdAt: '2024-01-21T16:20:00', location: 'Wayanad, Kerala',
    }
];

// ============================================
// RIDES DATA
// ============================================
const rides = [
    {
        id: 'ride_001', creatorId: 'user_001', title: 'Western Ghats Explorer',
        summary: {
            from: 'Chennai', to: 'Ooty', fromState: 'TN', toState: 'TN',
            routeName: 'Chennai → Krishnagiri → Dharmapuri → Ooty', totalKm: 580, days: 3,
            dateRange: 'Jan 25 - Jan 27, 2024',
            description: 'Experience the breathtaking beauty of the Western Ghats. This ride takes you through winding mountain roads, lush tea gardens, and misty hills. Perfect for those who love scenic routes and cool climates.'
        },
        fullDetails: {
            dailyPlan: [
                { day: 1, title: 'Chennai to Krishnagiri', distance: '210 km', hotel: 'Hotel Mountain View', cost: '₹1,500' },
                { day: 2, title: 'Krishnagiri to Dharmapuri', distance: '180 km', hotel: 'Riverside Resort', cost: '₹2,000' },
                { day: 3, title: 'Dharmapuri to Ooty', distance: '190 km', hotel: 'Pine Valley Homestay', cost: '₹2,500' }
            ],
            totalBudget: '₹12,000 - ₹15,000',
            meetingPoint: 'Chennai Central, 5:00 AM'
        },
        participants: ['user_001'], pendingRequests: ['user_002'], maxParticipants: 6,
        status: 'upcoming', difficulty: 'moderate'
    },
    {
        id: 'ride_002', creatorId: 'user_003', title: 'Konkan Coastal Dream',
        summary: {
            from: 'Hyderabad', to: 'Gokarna', fromState: 'TS', toState: 'KA',
            routeName: 'Hyderabad → Bijapur → Hubli → Gokarna', totalKm: 720, days: 4,
            dateRange: 'Feb 10 - Feb 13, 2024',
            description: 'A dream ride along the Konkan coast. Enjoy the salty breeze, pristine beaches, and delicious coastal cuisine. The route offers a mix of smooth highways and beautiful seaside roads.'
        },
        fullDetails: {
            dailyPlan: [
                { day: 1, title: 'Hyderabad to Bijapur', distance: '280 km', hotel: 'Hotel Royal', cost: '₹1,800' },
                { day: 2, title: 'Bijapur to Hubli', distance: '200 km', hotel: 'Hotel Comfort', cost: '₹1,500' }
            ],
            totalBudget: '₹18,000 - ₹22,000',
            meetingPoint: 'RGIA, 6:00 AM'
        },
        participants: ['user_003', 'user_001'], pendingRequests: [], maxParticipants: 8,
        status: 'upcoming', difficulty: 'easy'
    },
    {
        id: 'ride_004', creatorId: 'user_004', title: 'Ladakh Expedition 2024',
        summary: {
            from: 'Mumbai', to: 'Leh', fromState: 'MH', toState: 'LA',
            routeName: 'Mumbai → Delhi → Manali → Leh', totalKm: 4200, days: 20,
            dateRange: 'Jun 1 - Jun 20, 2024',
            description: 'The ultimate bucket-list ride for every biker. Conquer the highest motorable passes, witness the stark beauty of the cold desert, and push your limits in this epic 20-day expedition.'
        },
        fullDetails: {
            totalBudget: '₹80,000 - ₹1,00,000',
            meetingPoint: 'Gateway of India, 4:00 AM'
        },
        participants: ['user_004'], pendingRequests: ['user_001', 'user_002'], maxParticipants: 12,
        status: 'upcoming', difficulty: 'expert'
    }
];

// ============================================
// STORIES DATA
// ============================================
const stories = [
    { id: 'story_001', userId: 'user_001', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop', viewed: false },
    { id: 'story_002', userId: 'user_003', image: 'https://images.unsplash.com/photo-1568772585407-9361bd37ec91?w=400&h=600&fit=crop', viewed: true },
    { id: 'story_003', userId: 'user_004', image: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=400&h=600&fit=crop', viewed: false },
    { id: 'story_004', userId: 'user_002', image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=600&fit=crop', viewed: true },
    { id: 'story_005', userId: 'user_005', image: 'https://images.unsplash.com/photo-1590845947670-c009801ffa74?w=400&h=600&fit=crop', viewed: false }
];

// ============================================
// DUMMY CREDENTIALS
// ============================================
const dummyCredentials = {
    email: { email: 'example@gmail.com', password: 'example' },
    mobile: { countryCode: '+91', mobile: '1234', password: '1234' }
};

// ============================================
// CURRENT USER STATE
// ============================================
let currentUser = null;

// ============================================
// HELPER FUNCTIONS
// ============================================
function getUserById(userId) { return users.find(u => u.id === userId); }
function getUserByUsername(username) { return users.find(u => u.username === username); }
function getPostsByUserId(userId) { return posts.filter(p => p.userId === userId); }
function getRideById(rideId) { return rides.find(r => r.id === rideId); }
function getFeedPosts() { return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); }

function formatRelativeTime(dateString) {
    const diff = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(diff / 3600000);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
}

function simulateLogin(type, credentials) {
    const creds = dummyCredentials[type];
    const valid = type === 'email'
        ? credentials.email === creds.email && credentials.password === creds.password
        : credentials.mobile === creds.mobile && credentials.password === creds.password;
    if (valid) {
        currentUser = users[0];
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return { success: true, user: currentUser };
    }
    return { success: false, error: 'Invalid credentials' };
}

function checkAuthState() {
    const stored = localStorage.getItem('currentUser');
    if (stored) { currentUser = JSON.parse(stored); return currentUser; }
    return null;
}

// ============================================
// LOCAL STORAGE PERSISTENCE
// ============================================
function loadUserCreatedData() {
    try {
        const stored = JSON.parse(localStorage.getItem('userCreatedRides') || '[]');
        stored.forEach(item => {
            // Add to rides if not already there
            if (!rides.find(r => r.id === item.ride.id)) {
                rides.push(item.ride);
            }
            // Add to posts if not already there
            if (!posts.find(p => p.id === item.post.id)) {
                posts.push(item.post);
            }
        });
    } catch (e) {
        console.error('Error loading user created rides:', e);
    }
}

// Initialize data
loadUserCreatedData();
checkAuthState();
