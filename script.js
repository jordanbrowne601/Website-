// KineticAI Virtual Sports Coach Logic

const sportsData = {
    basketball: {
        title: "Basketball",
        overallScore: 78,
        ratingTitle: "Solid Mechanics",
        ratingDesc: "Good shot angle, but release point is early. Practice your follow-through.",
        storageUsed: "2.4 GB / 5.0 GB",
        storagePercent: 48,
        metrics: [
            { name: "Elbow Tucked Angle", score: 85 },
            { name: "Release Height", score: 70 },
            { name: "Knee Dip Synchronization", score: 80 }
        ],
        flaws: [
            "Flaw: Elbow flares outward by 12° during jump phase.",
            "Correction: Maintain vertical alignment of wrist, elbow, and hip."
        ],
        videos: [
            {
                title: "Fix Your Shooting Form: Perfect Elbow Alignment",
                channel: "Pure Sweat Basketball",
                thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80",
                url: "https://www.youtube.com/results?search_query=basketball+shooting+form+elbow"
            },
            {
                title: "Mastering Higher Release Point & Wrist Snap",
                channel: "ShotMechanics",
                thumbnail: "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=400&q=80",
                url: "https://www.youtube.com/results?search_query=basketball+higher+release+point"
            }
        ],
        skeletonPose: [
            { x: 0.45, y: 0.3 }, // Head
            { x: 0.45, y: 0.45 }, // Shoulder Center
            { x: 0.55, y: 0.4 }, // Right Shoulder
            { x: 0.65, y: 0.35 }, // Right Elbow (Raised)
            { x: 0.70, y: 0.25 }, // Right Hand (Shooting)
            { x: 0.45, y: 0.65 }, // Hips
            { x: 0.48, y: 0.80 }, // Right Knee
            { x: 0.50, y: 0.95 }  // Right Ankle
        ]
    },
    volleyball: {
        title: "Volleyball",
        overallScore: 64,
        ratingTitle: "Needs Arm Swing Adjustment",
        ratingDesc: "Approach speed is good, but your hitting shoulder droops prior to contact.",
        storageUsed: "3.8 GB / 5.0 GB",
        storagePercent: 76,
        metrics: [
            { name: "Approach Speed", score: 88 },
            { name: "Jump Vertical Peak", score: 72 },
            { name: "Arm Swing Torque", score: 55 }
        ],
        flaws: [
            "Flaw: Contacting ball 4 inches below maximum vertical height.",
            "Correction: Accelerate non-dominant arm up early to guide hitting path."
        ],
        videos: [
            {
                title: "Volleyball Spiking: How to Hit at Peak Height",
                channel: "Elevate Yourself",
                thumbnail: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=400&q=80",
                url: "https://www.youtube.com/results?search_query=volleyball+spiking+peak+height"
            },
            {
                title: "Fixing Arm Swing Biomechanics in Volleyball",
                channel: "Victoria Volleyball",
                thumbnail: "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=400&q=80",
                url: "https://www.youtube.com/results?search_query=volleyball+arm+swing+technique"
            }
        ],
        skeletonPose: [
            { x: 0.5, y: 0.2 },  // Head
            { x: 0.5, y: 0.35 }, // Shoulder Center
            { x: 0.65, y: 0.25 },// Right Arm High
            { x: 0.75, y: 0.15 },// Wrist extended overhead
            { x: 0.5, y: 0.55 }, // Hips
            { x: 0.42, y: 0.75 },// Left Leg Bend
            { x: 0.58, y: 0.75 } // Right Leg Bend
        ]
    },
    boxing: {
        title: "Boxing",
        overallScore: 82,
        ratingTitle: "Sharp Punch Mechanics",
        ratingDesc: "Excellent cross turn torque, but left guard drops slightly when throwing right.",
        storageUsed: "1.2 GB / 5.0 GB",
        storagePercent: 24,
        metrics: [
            { name: "Guard Retention", score: 68 },
            { name: "Punch Snap & Velocity", score: 92 },
            { name: "Hip Kinetic Rotation", score: 86 }
        ],
        flaws: [
            "Flaw: Opposite hand drops to chin line during power delivery.",
            "Correction: Glue non-punching cheek/glove to temple for defense coverage."
        ],
        videos: [
            {
                title: "Boxing Defense: Never Drop Your Guard While Punching",
                channel: "ExpertBoxing",
                thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=400&q=80",
                url: "https://www.youtube.com/results?search_query=boxing+keep+guard+up"
            },
            {
                title: "Generate Maximum Power in your Right Cross",
                channel: "Tony Jeffries",
                thumbnail: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=400&q=80",
                url: "https://www.youtube.com/results?search_query=boxing+right+cross+power"
            }
        ],
        skeletonPose: [
            { x: 0.48, y: 0.25 },// Head
            { x: 0.48, y: 0.40 },// Torso
            { x: 0.38, y: 0.35 },// Left Guard High (Tucked)
            { x: 0.68, y: 0.38 },// Right Extension (Punching)
            { x: 0.45, y: 0.65 },// Hips Tilted
            { x: 0.40, y: 0.85 } // Stance Leg
        ]
    }
};

const tierSpeeds = {
    free: { name: "Free Tier", delay: 8000, latency: "~300ms", text: "Processing via Shared Queue..." },
    pro: { name: "Pro Tier", delay: 3000, latency: "~25ms", text: "Fast GPU Neural Processing..." },
    elite: { name: "Elite Tier", delay: 1000, latency: "~5ms", text: "Low-latency Edge Stream Active..." }
};

// DOM Elements
const sportSelect = document.getElementById("sport-select");
const tierSelect = document.getElementById("tier-select");
const playBtn = document.getElementById("play-btn");
const analyzeBtn = document.getElementById("analyze-btn");
const playerVideo = document.getElementById("player-video");
const canvas = document.getElementById("skeleton-canvas");
const ctx = canvas.getContext("2d");
const loader = document.getElementById("processing-loader");
const loaderText = document.getElementById("loader-text");
const loaderSub = document.getElementById("loader-sub");
const latencyBadge = document.getElementById("latency-badge");

// Auth Elements
const openAuthBtn = document.getElementById("open-auth-btn");
const closeAuthModalBtn = document.getElementById("close-auth-modal");
const authModal = document.getElementById("auth-modal");
const authForm = document.getElementById("auth-form");
const authModalTitle = document.getElementById("auth-modal-title");
const authSubmitBtn = document.getElementById("auth-submit-btn");
const authToggleBtn = document.getElementById("auth-toggle-btn");
const authToggleText = document.getElementById("auth-toggle-text");
const nameFieldGroup = document.getElementById("name-field-group");
const userProfile = document.getElementById("user-profile");
const userAvatar = document.getElementById("user-avatar");
const userNameDisplay = document.getElementById("user-name-display");
const logoutBtn = document.getElementById("logout-btn");

let isSignUp = false;

// Canvas Sizing
function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Active State
let currentSport = "basketball";
let currentTier = "pro";

// Check session on startup
initAuthSession();
updateUI(currentSport);

// Auth Logic & Events
function initAuthSession() {
    const savedUser = localStorage.getItem("kinetic_user");
    if (savedUser) {
        const user = JSON.parse(savedUser);
        renderLoggedInUser(user);
    }
}

openAuthBtn.addEventListener("click", () => authModal.classList.remove("hidden"));
closeAuthModalBtn.addEventListener("click", () => authModal.classList.add("hidden"));

authToggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    isSignUp = !isSignUp;
    if (isSignUp) {
        authModalTitle.textContent = "Create KineticAI Account";
        authSubmitBtn.textContent = "Sign Up";
        authToggleText.textContent = "Already have an account?";
        authToggleBtn.textContent = "Sign In";
        nameFieldGroup.style.display = "flex";
    } else {
        authModalTitle.textContent = "Sign In to KineticAI";
        authSubmitBtn.textContent = "Sign In";
        authToggleText.textContent = "Don't have an account?";
        authToggleBtn.textContent = "Create Account";
        nameFieldGroup.style.display = "none";
    }
});

authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("auth-email").value;
    const name = document.getElementById("auth-name").value || email.split("@")[0];

    const userData = {
        name: name,
        email: email,
        initials: name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)
    };

    localStorage.setItem("kinetic_user", JSON.stringify(userData));
    renderLoggedInUser(userData);
    authModal.classList.add("hidden");
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("kinetic_user");
    userProfile.classList.add("hidden");
    openAuthBtn.classList.remove("hidden");
});

function renderLoggedInUser(user) {
    userAvatar.textContent = user.initials || "AT";
    userNameDisplay.textContent = user.name;
    openAuthBtn.classList.add("hidden");
    userProfile.classList.remove("hidden");
}

// Sport & Analysis Handlers
sportSelect.addEventListener("change", (e) => {
    currentSport = e.target.value;
    updateUI(currentSport);
});

tierSelect.addEventListener("change", (e) => {
    currentTier = e.target.value;
    latencyBadge.textContent = `Latency: ${tierSpeeds[currentTier].latency}`;
});

playBtn.addEventListener("click", () => {
    if (playerVideo.paused) {
        playerVideo.play();
    } else {
        playerVideo.pause();
    }
});

analyzeBtn.addEventListener("click", () => {
    runAIAnalysis();
});

function updateUI(sportKey) {
    const data = sportsData[sportKey];

    // Update Headings & Ratings
    document.getElementById("current-sport-badge").textContent = data.title;
    document.getElementById("overall-score").textContent = data.overallScore;
    document.getElementById("gauge-circle").style.background = `conic-gradient(#00f2fe ${data.overallScore}%, #1f293d 0deg)`;
    document.getElementById("skill-rating-title").textContent = data.ratingTitle;
    document.getElementById("skill-rating-desc").textContent = data.ratingDesc;

    // Update Storage Meter
    document.getElementById("storage-text").textContent = data.storageUsed;
    document.getElementById("storage-bar").style.width = `${data.storagePercent}%`;

    // Render Metrics
    const metricsContainer = document.getElementById("metrics-container");
    metricsContainer.innerHTML = data.metrics.map(m => `
        <div class="metric-item">
            <div class="metric-header">
                <span class="metric-name">${m.name}</span>
                <span class="metric-score">${m.score}%</span>
            </div>
            <div class="metric-bar-bg">
                <div class="metric-bar-fill" style="width: ${m.score}%;"></div>
            </div>
        </div>
    `).join("");

    // Render Flaws
    const flawsContainer = document.getElementById("flaws-list");
    flawsContainer.innerHTML = data.flaws.map(flaw => `
        <li class="flaw-card">
            <span class="flaw-icon">⚠️</span>
            <div>${flaw}</div>
        </li>
    `).join("");

    // Render Video Recommendations
    const videosContainer = document.getElementById("recommendations-grid");
    videosContainer.innerHTML = data.videos.map(v => `
        <a href="${v.url}" target="_blank" class="video-card">
            <div class="thumbnail-container">
                <img src="${v.thumbnail}" alt="Thumbnail">
                <span class="play-badge">YouTube</span>
            </div>
            <div class="video-info">
                <div class="video-title">${v.title}</div>
                <div class="video-channel">${v.channel}</div>
            </div>
        </a>
    `).join("");

    // Render Skeletal Pose onto Overlay
    drawSkeleton(data.skeletonPose);
}

function runAIAnalysis() {
    const tier = tierSpeeds[currentTier];
    loaderText.textContent = tier.text;
    loaderSub.textContent = `Estimated time: ${tier.delay / 1000}s (${tier.name})`;
    loader.classList.remove("hidden");

    setTimeout(() => {
        loader.classList.add("hidden");
        drawSkeleton(sportsData[currentSport].skeletonPose, true);
    }, tier.delay);
}

function drawSkeleton(points, animate = false) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!points || points.length === 0) return;

    ctx.strokeStyle = "#00f2fe";
    ctx.lineWidth = 4;
    ctx.fillStyle = "#10b981";

    // Draw Connective Lines
    ctx.beginPath();
    for (let i = 0; i < points.length - 1; i++) {
        const pt1 = { x: points[i].x * canvas.width, y: points[i].y * canvas.height };
        const pt2 = { x: points[i+1].x * canvas.width, y: points[i+1].y * canvas.height };
        
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
    }
    ctx.stroke();

    // Draw Keypoint Nodes
    points.forEach(pt => {
        const cx = pt.x * canvas.width;
        const cy = pt.y * canvas.height;

        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}