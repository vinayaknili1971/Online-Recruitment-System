// Icons Helper - Returns inline SVGs for UI components
const Icons = {
    briefcase: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-briefcase"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
    mapPin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    dollarSign: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    award: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    filter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    bookOpen: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
    logOut: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`,
    edit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>`,
    checkCircle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    hourglass: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-hourglass"><path d="M5 2h14"></path><path d="M5 22h14"></path><path d="M19 2v4c0 1.38-1.13 2.5-2.5 2.5S14 7.38 14 6V2"></path><path d="M19 22v-4c0-1.38-1.13-2.5-2.5-2.5S14 16.62 14 18v4"></path><path d="M12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>`,
    xCircle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
    grid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    save: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`
};

// Global Application State
const state = {
    view: 'login', // login, dashboard, browse, applications, profile
    user: null,
    jobs: [],
    applications: [],
    toastTimeout: null,
    
    // Live Search & Filter Parameters
    filters: {
        search: '',
        location: '',
        jobTypes: [],
        experience: ''
    },
    
    // Modals
    selectedJobId: null,
    showApplyFormForId: null,
    isLogoutConfirmOpen: false
};

// Sample Database
const SAMPLE_JOBS = [
    {
        id: "job-1",
        title: "Senior Frontend Engineer",
        company: "VibeTech Corp",
        location: "Remote",
        jobType: "Full-time",
        salary: "$125,000 - $145,000",
        experience: "Senior (5+ yrs)",
        postedDate: "2026-08-16",
        skills: ["React", "JavaScript", "TypeScript", "TailwindCSS", "Vite"],
        description: "We are looking for a Senior Frontend Engineer to lead the design and implementation of our next-generation web application. You will work closely with product managers and UX designers to create fast, robust, and accessible user interfaces.",
        requirements: [
            "5+ years of experience with modern frontend applications built with React.",
            "Strong understanding of ES6+ JavaScript, TypeScript, and functional programming.",
            "Experience with modern build tools like Vite, Webpack, and CSS frameworks.",
            "Ability to write clean, reusable components and write comprehensive tests.",
            "Strong collaboration and communication skills."
        ]
    },
    {
        id: "job-2",
        title: "Full Stack Developer",
        company: "ByteNexus",
        location: "San Francisco, CA",
        jobType: "Full-time",
        salary: "$110,000 - $135,000",
        experience: "Mid-level (2-5 yrs)",
        postedDate: "2026-08-14",
        skills: ["Node.js", "Express", "React", "MongoDB", "REST APIs"],
        description: "ByteNexus is hiring a versatile Full Stack Developer to build and maintain end-to-end features for our analytics dashboard. You will write code for the React client and Node/Express servers, deploying to cloud environments.",
        requirements: [
            "3+ years of professional backend and frontend development experience.",
            "Hands-on database experience with MongoDB, PostgreSQL, or MySQL.",
            "Proficient in writing RESTful web APIs.",
            "Familiarity with containerization (Docker) and AWS deployment is a plus.",
            "Bachelor's degree in Computer Science or equivalent experience."
        ]
    },
    {
        id: "job-3",
        title: "UX/UI Product Designer",
        company: "CreativeFlow Studio",
        location: "Austin, TX",
        jobType: "Contract",
        salary: "$75 - $90 / hr",
        experience: "Mid-level (2-5 yrs)",
        postedDate: "2026-08-17",
        skills: ["Figma", "User Research", "Wireframing", "Prototyping", "UI Design"],
        description: "We need a UX/UI Product Designer for a 6-month contract to redesign our web and mobile applications. You will create high-fidelity mockups, conduct user testing, and establish design systems that align with modern design principles.",
        requirements: [
            "3+ years of UX/UI design experience for consumer-facing SaaS applications.",
            "Expertise in Figma and prototyping tools.",
            "A strong portfolio showcasing end-to-end product design case studies.",
            "Ability to create clean, responsive typography grids and color systems.",
            "Strong communication skills to present designs to engineering teams."
        ]
    },
    {
        id: "job-4",
        title: "Data Analyst",
        company: "GrowthMetrics",
        location: "Chicago, IL",
        jobType: "Full-time",
        salary: "$90,000 - $110,000",
        experience: "Junior (1-2 yrs)",
        postedDate: "2026-08-12",
        skills: ["SQL", "Python", "Tableau", "Excel", "A/B Testing"],
        description: "GrowthMetrics is looking for an analytical mind to join our growth squad. You will dig into user behavior data, build visualization dashboards, design A/B experiments, and present key data findings to business stakeholders.",
        requirements: [
            "Proficient in writing complex SQL queries.",
            "Familiarity with python libraries like pandas, numpy, and matplotlib.",
            "1-2 years of experience setting up BI reports (Tableau, PowerBI).",
            "Understanding of statistical significance and experimentation principles.",
            "Detail-oriented with a passion for uncovering business insights."
        ]
    },
    {
        id: "job-5",
        title: "DevOps Engineer",
        company: "CloudSec Systems",
        location: "Remote",
        jobType: "Full-time",
        salary: "$140,000 - $160,000",
        experience: "Senior (5+ yrs)",
        postedDate: "2026-08-15",
        skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
        description: "Join CloudSec as a DevOps Engineer! You will design, build, and support cloud-agnostic deployment configurations. We are scaling our Kubernetes clusters and strengthening our automated pipelines.",
        requirements: [
            "Strong experience managing production clouds on AWS, GCP, or Azure.",
            "Deep expertise in Kubernetes orchestration and Docker containers.",
            "Familiarity with Infrastructure as Code (IaC) tools, especially Terraform.",
            "Proven track record building robust GitHub Actions or GitLab CI pipelines.",
            "Experience with Linux scripting and network security audits."
        ]
    },
    {
        id: "job-6",
        title: "Product Manager",
        company: "Brandify Co.",
        location: "New York, NY",
        jobType: "Full-time",
        salary: "$130,000 - $155,000",
        experience: "Senior (5+ yrs)",
        postedDate: "2026-08-10",
        skills: ["Agile", "Jira", "Product Roadmap", "Customer Discovery", "Analytics"],
        description: "We are seeking a Product Manager to take ownership of our customer retention platform. You will discover customer pain points, write user stories, run agile sprints, and measure success through clear metrics.",
        requirements: [
            "4+ years of product management experience, preferably in B2B SaaS.",
            "Track record of taking features from conception to launch.",
            "Deep experience conducting customer interviews and translating feedback.",
            "Fluency with tools like Jira, Mixpanel, and Hotjar.",
            "Outstanding leadership and written documentation skills."
        ]
    },
    {
        id: "job-7",
        title: "Mobile App Developer",
        company: "AppVelocity",
        location: "Remote",
        jobType: "Part-time",
        salary: "$55 - $75 / hr",
        experience: "Mid-level (2-5 yrs)",
        postedDate: "2026-08-11",
        skills: ["React Native", "iOS", "Android", "Redux", "Swift"],
        description: "AppVelocity is seeking a part-time React Native Developer to maintain and release updates for our e-commerce client apps. This position offers flexible hours and requires a self-motivated engineer.",
        requirements: [
            "2+ years of production experience working with React Native.",
            "Familiarity with publishing applications on the Apple App Store and Google Play Store.",
            "Experience integrating native Swift/Kotlin plugins is highly desirable.",
            "Ability to design smooth 60fps mobile transitions and animations.",
            "Comfortable working independently in an asynchronous environment."
        ]
    }
];

const DEFAULT_PROFILE = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 019-2834",
    title: "Software Engineer (Frontend)",
    bio: "Passionate and detail-oriented frontend engineer with 3+ years of experience building beautiful, accessible, and high-performance web applications using JavaScript, React, and CSS. Strong advocate for clean architecture and design systems.",
    education: {
        degree: "Bachelor of Science in Computer Science",
        school: "State University",
        year: "2018 - 2022"
    },
    skills: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Vite", "TailwindCSS", "Git"],
    experience: {
        role: "Frontend Engineer",
        company: "ByteNexus Technologies",
        duration: "2022 - Present",
        description: "Developed and optimized SaaS dashboard features. Collaborated with design teams to maintain design system libraries. Re-architected key sections of client app using Vite, reducing build times by 40%."
    }
};

const DEFAULT_APPLICATIONS = [
    {
        id: "app-101",
        jobId: "job-1",
        appliedDate: "2026-08-12",
        status: "Under Review",
        resumeName: "jane_doe_resume.pdf",
        coverLetter: "I am excited to apply for the Senior Frontend Engineer role at VibeTech. Having used React and build tools like Vite extensively, I believe I can make immediate impacts on your development team."
    },
    {
        id: "app-102",
        jobId: "job-4",
        appliedDate: "2026-08-15",
        status: "Shortlisted",
        resumeName: "jane_doe_resume.pdf",
        coverLetter: "I have extensive training in SQL queries and Python statistics. I am eager to bring my analytical background to the GrowthMetrics squad."
    }
];

// Initialize database from localStorage or default configurations
function initDatabase() {
    // Jobs
    if (!localStorage.getItem('recruitment_jobs')) {
        localStorage.setItem('recruitment_jobs', JSON.stringify(SAMPLE_JOBS));
    }
    state.jobs = JSON.parse(localStorage.getItem('recruitment_jobs'));

    // Profile
    if (!localStorage.getItem('recruitment_applicant_profile')) {
        localStorage.setItem('recruitment_applicant_profile', JSON.stringify(DEFAULT_PROFILE));
    }
    state.user = JSON.parse(localStorage.getItem('recruitment_applicant_profile'));

    // Applications
    if (!localStorage.getItem('recruitment_applications')) {
        localStorage.setItem('recruitment_applications', JSON.stringify(DEFAULT_APPLICATIONS));
    }
    state.applications = JSON.parse(localStorage.getItem('recruitment_applications'));

    // Session Status Check
    const activeSession = localStorage.getItem('recruitment_applicant_session');
    if (activeSession) {
        state.view = 'dashboard';
    } else {
        state.view = 'login';
    }
}

// Save profile updates or applications list to localStorage
function saveState() {
    localStorage.setItem('recruitment_applicant_profile', JSON.stringify(state.user));
    localStorage.setItem('recruitment_applications', JSON.stringify(state.applications));
}

// Global Toast Alerts
function showToast(message, type = 'success') {
    // Clear previous timeout if any
    if (state.toastTimeout) {
        clearTimeout(state.toastTimeout);
    }
    
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const icon = type === 'success' ? Icons.checkCircle : Icons.xCircle;
    container.innerHTML = `
        <div class="toast ${type}">
            <div class="toast-icon ${type}">${icon}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    state.toastTimeout = setTimeout(() => {
        const toast = container.querySelector('.toast');
        if (toast) {
            toast.style.animation = 'toast-slide-in 0.3s ease reverse forwards';
            setTimeout(() => {
                container.innerHTML = '';
            }, 300);
        }
    }, 3000);
}

// View Switches
function switchView(viewName) {
    state.view = viewName;
    
    // Reset filters when switching views
    if (viewName !== 'browse') {
        state.filters = { search: '', location: '', jobTypes: [], experience: '' };
    }
    
    // Close modals
    state.selectedJobId = null;
    state.showApplyFormForId = null;
    state.isLogoutConfirmOpen = false;
    
    renderApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// APP RENDERING ORCHESTRATION
function renderApp() {
    const appEl = document.getElementById('app');
    if (!appEl) return;
    
    if (state.view === 'login') {
        appEl.innerHTML = renderLoginView();
        setupLoginListeners();
        return;
    }
    
    // Navigation and Shell
    let html = renderHeaderSection();
    
    html += `<main>`;
    switch (state.view) {
        case 'dashboard':
            html += renderDashboardView();
            break;
        case 'browse':
            html += renderBrowseView();
            break;
        case 'applications':
            html += renderApplicationsView();
            break;
        case 'profile':
            html += renderProfileView();
            break;
    }
    html += `</main>`;
    
    // Modals layer
    html += renderModalsLayer();
    
    appEl.innerHTML = html;
    setupGlobalListeners();
}

// LOGIN VIEW
function renderLoginView() {
    return `
        <div class="login-container">
            <div class="login-logo">
                ${Icons.briefcase}
            </div>
            <h1 class="login-title">Online Recruitment System</h1>
            <p class="login-subtitle">Applicant Portal Access</p>
            
            <div class="login-card">
                <form id="login-form">
                    <div class="form-group text-left" style="margin-bottom: 1.5rem;">
                        <label class="form-label">Email Address</label>
                        <input type="email" id="login-email" class="input-control" value="jane.doe@example.com" required placeholder="name@example.com">
                    </div>
                    <button type="submit" class="login-btn">
                        <span>Sign In as Applicant</span>
                        ${Icons.checkCircle}
                    </button>
                </form>
            </div>
        </div>
    `;
}

function setupLoginListeners() {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            
            // Set session
            localStorage.setItem('recruitment_applicant_session', email);
            
            // Initialize user data if email matches or mock
            if (email === 'jane.doe@example.com') {
                state.user = JSON.parse(localStorage.getItem('recruitment_applicant_profile')) || DEFAULT_PROFILE;
            } else {
                // Keep existing name, customize email
                const newUser = { ...DEFAULT_PROFILE, email: email, name: email.split('@')[0].replace('.', ' ') };
                state.user = newUser;
                localStorage.setItem('recruitment_applicant_profile', JSON.stringify(newUser));
            }
            
            showToast("Logged in successfully!");
            switchView('dashboard');
        });
    }
}

// HEADER AND NAVIGATION
function renderHeaderSection() {
    const initials = state.user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    return `
        <header>
            <div class="nav-container">
                <div class="logo-section" onclick="window.switchView('dashboard')">
                    <div class="logo-icon">${Icons.briefcase}</div>
                    <div class="logo-text">Online Recruitment System</div>
                </div>
                
                <nav class="nav-tabs">
                    <button class="nav-tab-btn ${state.view === 'dashboard' ? 'active' : ''}" onclick="window.switchView('dashboard')">
                        ${Icons.grid} Dashboard
                    </button>
                    <button class="nav-tab-btn ${state.view === 'browse' ? 'active' : ''}" onclick="window.switchView('browse')">
                        ${Icons.search} Browse Jobs
                    </button>
                    <button class="nav-tab-btn ${state.view === 'applications' ? 'active' : ''}" onclick="window.switchView('applications')">
                        ${Icons.bookOpen} My Applications
                    </button>
                    <button class="nav-tab-btn ${state.view === 'profile' ? 'active' : ''}" onclick="window.switchView('profile')">
                        ${Icons.user} My Profile
                    </button>
                </nav>
                
                <div class="profile-section">
                    <div class="user-avatar" title="View Profile" onclick="window.switchView('profile')">
                        ${initials}
                    </div>
                    <button class="logout-btn" onclick="window.confirmLogout()">
                        ${Icons.logOut} Logout
                    </button>
                </div>
            </div>
        </header>
    `;
}

// DASHBOARD VIEW
function renderDashboardView() {
    const appliedJobs = state.applications.length;
    const reviewJobs = state.applications.filter(a => a.status === 'Under Review').length;
    const shortlistedJobs = state.applications.filter(a => a.status === 'Shortlisted').length;
    
    // Find matching jobs (contains any of user's skills)
    const matchingJobs = state.jobs.filter(job => {
        // Exclude already applied
        const isApplied = state.applications.some(app => app.jobId === job.id);
        if (isApplied) return false;
        
        // Match skills
        return job.skills.some(skill => 
            state.user.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
        );
    });

    const recentApps = [...state.applications].sort((a,b) => b.appliedDate.localeCompare(a.appliedDate)).slice(0, 3);
    
    return `
        <div class="welcome-banner">
            <h1 class="welcome-title">Welcome back, <span>${state.user.name}</span>!</h1>
            <p class="welcome-desc">Explore new job postings matching your background as a <strong>${state.user.title}</strong>, check on ongoing applications, or update your professional profile.</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card glass-panel" onclick="window.switchView('browse')">
                <div class="stat-icon indigo">${Icons.briefcase}</div>
                <div class="stat-info">
                    <div class="stat-value">${state.jobs.length}</div>
                    <div class="stat-label">Total Jobs</div>
                </div>
            </div>
            <div class="stat-card glass-panel" onclick="window.switchView('applications')">
                <div class="stat-icon blue">${Icons.bookOpen}</div>
                <div class="stat-info">
                    <div class="stat-value">${appliedJobs}</div>
                    <div class="stat-label">Applications</div>
                </div>
            </div>
            <div class="stat-card glass-panel" onclick="window.switchView('applications')">
                <div class="stat-icon amber">${Icons.hourglass}</div>
                <div class="stat-info">
                    <div class="stat-value">${reviewJobs}</div>
                    <div class="stat-label">Under Review</div>
                </div>
            </div>
            <div class="stat-card glass-panel" onclick="window.switchView('applications')">
                <div class="stat-icon green">${Icons.checkCircle}</div>
                <div class="stat-info">
                    <div class="stat-value">${shortlistedJobs}</div>
                    <div class="stat-label">Shortlisted</div>
                </div>
            </div>
        </div>
        
        <div class="dashboard-sections">
            <div class="section-card glass-panel">
                <div class="section-header">
                    <h3 class="section-title">${Icons.award} Matching Job Recommendations</h3>
                    <button class="section-action-btn" onclick="window.switchView('browse')">See All Jobs &rarr;</button>
                </div>
                <div class="jobs-list">
                    ${matchingJobs.length > 0 ? 
                        matchingJobs.slice(0, 3).map(job => renderJobCardMarkup(job)).join('') : 
                        `<div class="empty-state">
                            <div class="empty-state-icon">${Icons.info}</div>
                            <p>No new job recommendations found matching your profile skills.</p>
                            <button class="btn btn-primary" onclick="window.switchView('browse')">Browse All Jobs</button>
                         </div>`
                    }
                </div>
            </div>
            
            <div class="section-card glass-panel">
                <div class="section-header">
                    <h3 class="section-title">${Icons.clock} Recent Activity</h3>
                    <button class="section-action-btn" onclick="window.switchView('applications')">Track All</button>
                </div>
                <div class="timeline-list">
                    ${recentApps.length > 0 ? 
                        recentApps.map(app => {
                            const job = state.jobs.find(j => j.id === app.jobId);
                            if (!job) return '';
                            let statusClass = 'applied';
                            let icon = Icons.checkCircle;
                            if (app.status === 'Under Review') { statusClass = 'review'; icon = Icons.hourglass; }
                            else if (app.status === 'Shortlisted') { statusClass = 'shortlisted'; icon = Icons.checkCircle; }
                            else if (app.status === 'Rejected') { statusClass = 'rejected'; icon = Icons.xCircle; }
                            
                            return `
                                <div class="timeline-item">
                                    <div class="timeline-dot ${statusClass}">${icon}</div>
                                    <div class="timeline-content">
                                        <div class="timeline-title">${job.title}</div>
                                        <div class="timeline-subtitle">${job.company}</div>
                                        <div class="timeline-date">Status: <strong>${app.status}</strong> • Applied ${app.appliedDate}</div>
                                    </div>
                                </div>
                            `;
                        }).join('') : 
                        `<div class="empty-state" style="padding: 1.5rem 0;">
                            <p>No application activity found. Get started by applying for jobs!</p>
                         </div>`
                    }
                </div>
            </div>
        </div>
    `;
}

// BROWSE JOBS VIEW
function renderBrowseView() {
    // Locations extracted dynamically from database
    const locations = Array.from(new Set(state.jobs.map(j => j.location)));
    
    // Live filter evaluation
    const filteredJobs = state.jobs.filter(job => {
        // Keyword check
        if (state.filters.search) {
            const query = state.filters.search.toLowerCase();
            const titleMatch = job.title.toLowerCase().includes(query);
            const compMatch = job.company.toLowerCase().includes(query);
            const skillMatch = job.skills.some(s => s.toLowerCase().includes(query));
            if (!titleMatch && !compMatch && !skillMatch) return false;
        }
        
        // Location check
        if (state.filters.location && job.location !== state.filters.location) {
            return false;
        }
        
        // Job Type check
        if (state.filters.jobTypes.length > 0 && !state.filters.jobTypes.includes(job.jobType)) {
            return false;
        }
        
        // Experience level check
        if (state.filters.experience) {
            const matchSeniority = job.experience.toLowerCase().startsWith(state.filters.experience.toLowerCase());
            if (!matchSeniority) return false;
        }
        
        return true;
    });

    return `
        <div class="browse-layout">
            <!-- Left Filters Column -->
            <div class="filters-panel glass-panel">
                <div class="section-header" style="margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                    <h3 style="font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                        ${Icons.filter} Filters
                    </h3>
                    <button class="section-action-btn" onclick="window.clearAllFilters()">Clear All</button>
                </div>
                
                <div class="filter-group">
                    <label class="filter-label">Search Keyword</label>
                    <div style="position: relative;">
                        <input type="text" id="search-input" class="input-control" placeholder="Title, company, skill..." value="${state.filters.search}" oninput="window.updateFilterSearch(this.value)">
                    </div>
                </div>
                
                <div class="filter-group">
                    <label class="filter-label">Location</label>
                    <select class="input-control" onchange="window.updateFilterLocation(this.value)">
                        <option value="">All Locations</option>
                        ${locations.map(loc => `<option value="${loc}" ${state.filters.location === loc ? 'selected' : ''}>${loc}</option>`).join('')}
                    </select>
                </div>
                
                <div class="filter-group">
                    <label class="filter-label">Job Type</label>
                    <div class="checkbox-group">
                        ${['Full-time', 'Part-time', 'Contract', 'Remote'].map(type => `
                            <label class="checkbox-label">
                                <input type="checkbox" value="${type}" 
                                    ${state.filters.jobTypes.includes(type) ? 'checked' : ''} 
                                    onchange="window.updateFilterJobType(this.value, this.checked)">
                                <span>${type}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                
                <div class="filter-group">
                    <label class="filter-label">Experience Level</label>
                    <select class="input-control" onchange="window.updateFilterExperience(this.value)">
                        <option value="">All Levels</option>
                        <option value="Junior" ${state.filters.experience === 'Junior' ? 'selected' : ''}>Junior (1-2 yrs)</option>
                        <option value="Mid-level" ${state.filters.experience === 'Mid-level' ? 'selected' : ''}>Mid-level (2-5 yrs)</option>
                        <option value="Senior" ${state.filters.experience === 'Senior' ? 'selected' : ''}>Senior (5+ yrs)</option>
                    </select>
                </div>
            </div>
            
            <!-- Right Jobs List Column -->
            <div class="jobs-grid-section">
                <div class="results-summary">
                    <div class="results-count">
                        Showing <span>${filteredJobs.length}</span> jobs matching criteria
                    </div>
                </div>
                
                <div class="jobs-list">
                    ${filteredJobs.length > 0 ? 
                        filteredJobs.map(job => renderJobCardMarkup(job)).join('') : 
                        `<div class="empty-state glass-panel">
                            <div class="empty-state-icon">${Icons.info}</div>
                            <h3>No job listings match your filters</h3>
                            <p>Try resetting filters or search for another keyword like "React" or "SQL".</p>
                            <button class="btn btn-primary" onclick="window.clearAllFilters()">Reset Search</button>
                         </div>`
                    }
                </div>
            </div>
        </div>
    `;
}

// RENDER SINGLE JOB CARD DYNAMICALLY
function renderJobCardMarkup(job) {
    const hasApplied = state.applications.some(app => app.jobId === job.id);
    const initials = job.company.split(' ').map(w => w[0]).join('').slice(0, 2);
    
    return `
        <div class="job-card">
            <div class="job-card-header">
                <div class="company-branding">
                    <div class="company-logo-placeholder">${initials}</div>
                    <div class="job-meta-main">
                        <h4 class="job-title-link" onclick="window.openJobDetails('${job.id}')">${job.title}</h4>
                        <div class="company-name">${job.company}</div>
                    </div>
                </div>
                <span class="job-type-badge">${job.jobType}</span>
            </div>
            
            <div class="job-details-row">
                <div class="job-detail-item">
                    ${Icons.mapPin} <span>${job.location}</span>
                </div>
                <div class="job-detail-item">
                    ${Icons.dollarSign} <span>${job.salary}</span>
                </div>
                <div class="job-detail-item">
                    ${Icons.award} <span>${job.experience}</span>
                </div>
            </div>
            
            <div class="skills-container">
                ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            
            <div class="job-card-actions">
                <span class="posted-date">${Icons.clock} Posted ${job.postedDate}</span>
                <div class="actions-buttons">
                    <button class="btn btn-secondary" onclick="window.openJobDetails('${job.id}')">View Details</button>
                    ${hasApplied ? 
                        `<button class="btn btn-applied" disabled>${Icons.checkCircle} Applied</button>` : 
                        `<button class="btn btn-success" onclick="window.openApplyModal('${job.id}')">Apply Now</button>`
                    }
                </div>
            </div>
        </div>
    `;
}

// MY APPLICATIONS VIEW
function renderApplicationsView() {
    return `
        <div class="section-card glass-panel" style="padding: 2rem;">
            <div class="section-header" style="margin-bottom: 2rem;">
                <h2 class="section-title" style="font-size: 1.5rem;">
                    ${Icons.bookOpen} Track Submitted Applications
                </h2>
                <span class="results-count">Total Applied: <span>${state.applications.length}</span></span>
            </div>
            
            <div class="applications-list">
                ${state.applications.length > 0 ? 
                    state.applications.map(app => {
                        const job = state.jobs.find(j => j.id === app.jobId);
                        if (!job) return '';
                        
                        let badgeClass = 'applied';
                        let statusIcon = Icons.checkCircle;
                        if (app.status === 'Under Review') { badgeClass = 'review'; statusIcon = Icons.hourglass; }
                        else if (app.status === 'Shortlisted') { badgeClass = 'shortlisted'; statusIcon = Icons.checkCircle; }
                        else if (app.status === 'Rejected') { badgeClass = 'rejected'; statusIcon = Icons.xCircle; }
                        
                        return `
                            <div class="application-item glass-panel">
                                <div class="app-job-info">
                                    <div class="company-logo-placeholder">${job.company.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                                    <div class="app-details">
                                        <h4 class="app-job-title">${job.title}</h4>
                                        <div class="app-company-name">${job.company}</div>
                                        <div class="app-meta-row">
                                            <span>${Icons.mapPin} ${job.location}</span>
                                            <span>${Icons.dollarSign} ${job.salary}</span>
                                            <span>Applied on: ${app.appliedDate}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="app-status-column" style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
                                    <span class="status-badge ${badgeClass}">
                                        ${statusIcon} ${app.status}
                                    </span>
                                    <button class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.3rem 0.6rem;" onclick="window.openJobDetails('${job.id}')">View Job Details</button>
                                </div>
                            </div>
                        `;
                    }).join('') : 
                    `<div class="empty-state">
                        <div class="empty-state-icon">${Icons.info}</div>
                        <h3>You haven't submitted any job applications yet</h3>
                        <p>Discover available matching positions and apply today!</p>
                        <button class="btn btn-primary" onclick="window.switchView('browse')">Browse Jobs</button>
                     </div>`
                }
            </div>
        </div>
    `;
}

// PROFILE VIEW (AND EDIT MODE SWITCH)
let isEditProfileMode = false;

function renderProfileView() {
    if (isEditProfileMode) {
        return renderEditProfileFormMarkup();
    }
    
    return `
        <div class="profile-grid">
            <!-- Left Overview Column -->
            <div class="profile-card glass-panel">
                <div class="profile-avatar-large">
                    ${state.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <h3 class="profile-name">${state.user.name}</h3>
                <div class="profile-title">${state.user.title}</div>
                
                <button class="btn btn-primary w-full" onclick="window.toggleEditProfile(true)">
                    ${Icons.edit} Edit Profile Details
                </button>
                
                <div class="profile-meta-info">
                    <div class="profile-meta-item">
                        ${Icons.mail}
                        <div>
                            <div style="font-size: 0.75rem; color: var(--text-dim);">Email Address</div>
                            <div>${state.user.email}</div>
                        </div>
                    </div>
                    <div class="profile-meta-item">
                        ${Icons.phone}
                        <div>
                            <div style="font-size: 0.75rem; color: var(--text-dim);">Phone Number</div>
                            <div>${state.user.phone}</div>
                        </div>
                    </div>
                    <div class="profile-meta-item">
                        ${Icons.bookOpen}
                        <div>
                            <div style="font-size: 0.75rem; color: var(--text-dim);">Education</div>
                            <div>${state.user.education.degree}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Right Detailed Content Column -->
            <div class="profile-details-panel">
                <!-- Professional Bio -->
                <div class="profile-detail-card glass-panel">
                    <h3 class="profile-detail-section-title">${Icons.user} Professional Summary</h3>
                    <div class="profile-text-block">${state.user.bio}</div>
                </div>
                
                <!-- Skills Tags -->
                <div class="profile-detail-card glass-panel">
                    <h3 class="profile-detail-section-title">${Icons.award} Core Competencies</h3>
                    <div class="skills-container" style="gap: 0.6rem;">
                        ${state.user.skills.map(skill => `<span class="skill-tag" style="font-size: 0.85rem; padding: 0.35rem 0.85rem; border-radius: 50px;">${skill}</span>`).join('')}
                    </div>
                </div>
                
                <!-- Work Experience -->
                <div class="profile-detail-card glass-panel">
                    <h3 class="profile-detail-section-title">${Icons.briefcase} Work History</h3>
                    <div class="profile-experience-item">
                        <div class="item-title">${state.user.experience.role}</div>
                        <div class="item-subtitle">${state.user.experience.company}</div>
                        <div class="item-duration">${state.user.experience.duration}</div>
                        <div class="profile-text-block mt-4" style="font-size: 0.9rem;">
                            ${state.user.experience.description.split('\n').map(line => `<p style="margin-bottom: 0.4rem;">${line}</p>`).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Education details -->
                <div class="profile-detail-card glass-panel">
                    <h3 class="profile-detail-section-title">${Icons.bookOpen} Educational Credentials</h3>
                    <div class="profile-education-item">
                        <div class="item-title">${state.user.education.degree}</div>
                        <div class="item-subtitle">${state.user.education.school}</div>
                        <div class="item-duration">${state.user.education.year}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderEditProfileFormMarkup() {
    return `
        <div class="section-card glass-panel" style="max-width: 800px; margin: 0 auto; padding: 2.5rem;">
            <div class="section-header" style="margin-bottom: 2rem;">
                <h2 class="section-title" style="font-size: 1.5rem;">
                    ${Icons.edit} Edit Applicant Profile
                </h2>
                <button class="btn btn-secondary" onclick="window.toggleEditProfile(false)">Cancel</button>
            </div>
            
            <form id="edit-profile-form" onsubmit="window.saveProfileUpdates(event)">
                <div class="edit-form-row">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" id="edit-name" class="input-control" value="${state.user.name}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Professional Title</label>
                        <input type="text" id="edit-title" class="input-control" value="${state.user.title}" required>
                    </div>
                </div>
                
                <div class="edit-form-row">
                    <div class="form-group">
                        <label class="form-label">Email Address</label>
                        <input type="email" id="edit-email" class="input-control" value="${state.user.email}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone Number</label>
                        <input type="text" id="edit-phone" class="input-control" value="${state.user.phone}" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Professional Summary</label>
                    <textarea id="edit-bio" class="input-control textarea-control" required>${state.user.bio}</textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Core Competencies / Skills (comma separated)</label>
                    <input type="text" id="edit-skills" class="input-control" value="${state.user.skills.join(', ')}" required placeholder="React, Node.js, CSS">
                </div>
                
                <h3 class="profile-detail-section-title" style="margin: 2rem 0 1rem 0;">${Icons.briefcase} Work Experience</h3>
                <div class="edit-form-row">
                    <div class="form-group">
                        <label class="form-label">Role Title</label>
                        <input type="text" id="edit-exp-role" class="input-control" value="${state.user.experience.role}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Company Name</label>
                        <input type="text" id="edit-exp-company" class="input-control" value="${state.user.experience.company}" required>
                    </div>
                </div>
                <div class="edit-form-row">
                    <div class="form-group">
                        <label class="form-label">Duration (e.g. 2022 - Present)</label>
                        <input type="text" id="edit-exp-duration" class="input-control" value="${state.user.experience.duration}" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Role Description (one point per line)</label>
                    <textarea id="edit-exp-desc" class="input-control textarea-control" required>${state.user.experience.description}</textarea>
                </div>
                
                <h3 class="profile-detail-section-title" style="margin: 2rem 0 1rem 0;">${Icons.bookOpen} Education</h3>
                <div class="edit-form-row">
                    <div class="form-group">
                        <label class="form-label">Degree / Major</label>
                        <input type="text" id="edit-edu-degree" class="input-control" value="${state.user.education.degree}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">School / University Name</label>
                        <input type="text" id="edit-edu-school" class="input-control" value="${state.user.education.school}" required>
                    </div>
                </div>
                <div class="edit-form-row">
                    <div class="form-group">
                        <label class="form-label">Graduation Year / Span (e.g. 2018 - 2022)</label>
                        <input type="text" id="edit-edu-year" class="input-control" value="${state.user.education.year}" required>
                    </div>
                </div>
                
                <div class="modal-footer" style="padding: 1.5rem 0 0 0; margin-top: 2rem; border-top: 1px solid var(--border-color);">
                    <button type="button" class="btn btn-secondary" onclick="window.toggleEditProfile(false)">Cancel</button>
                    <button type="submit" class="btn btn-success">${Icons.save} Save Profile Changes</button>
                </div>
            </form>
        </div>
    `;
}

// TOGGLE PROFILE EDIT MODE
window.toggleEditProfile = function(editState) {
    isEditProfileMode = editState;
    renderApp();
};

window.saveProfileUpdates = function(e) {
    e.preventDefault();
    
    // Parse skill CSV to array
    const rawSkills = document.getElementById('edit-skills').value;
    const skillsArr = rawSkills.split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);
        
    state.user = {
        name: document.getElementById('edit-name').value.trim(),
        title: document.getElementById('edit-title').value.trim(),
        email: document.getElementById('edit-email').value.trim(),
        phone: document.getElementById('edit-phone').value.trim(),
        bio: document.getElementById('edit-bio').value.trim(),
        education: {
            degree: document.getElementById('edit-edu-degree').value.trim(),
            school: document.getElementById('edit-edu-school').value.trim(),
            year: document.getElementById('edit-edu-year').value.trim()
        },
        skills: skillsArr,
        experience: {
            role: document.getElementById('edit-exp-role').value.trim(),
            company: document.getElementById('edit-exp-company').value.trim(),
            duration: document.getElementById('edit-exp-duration').value.trim(),
            description: document.getElementById('edit-exp-desc').value.trim()
        }
    };
    
    saveState();
    isEditProfileMode = false;
    showToast("Profile details updated successfully!");
    renderApp();
};

// MODALS AND OVERLAYS MARKUP RENDER
function renderModalsLayer() {
    let overlayHtml = '';
    
    // 1. Job Details Modal
    if (state.selectedJobId) {
        const job = state.jobs.find(j => j.id === state.selectedJobId);
        if (job) {
            const hasApplied = state.applications.some(app => app.jobId === job.id);
            overlayHtml += `
                <div class="modal-overlay active" onclick="window.closeAllModals(event)">
                    <div class="modal-content" onclick="event.stopPropagation()">
                        <div class="modal-header">
                            <h3 class="modal-title">${job.title}</h3>
                            <button class="modal-close-btn" onclick="window.closeAllModals()">${Icons.close}</button>
                        </div>
                        <div class="modal-body">
                            <div class="job-modal-details-grid">
                                <div class="job-modal-heading">
                                    <div class="company-branding">
                                        <div class="company-logo-placeholder">${job.company.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                                        <div>
                                            <div style="font-weight: 700; font-size: 1.1rem;">${job.company}</div>
                                            <div style="font-size: 0.85rem; color: var(--text-muted);">${job.location} • ${job.jobType}</div>
                                        </div>
                                    </div>
                                    <span class="job-type-badge">${job.salary}</span>
                                </div>
                                
                                <div class="job-details-row mt-4" style="background: var(--bg-tertiary); padding: 0.8rem 1.2rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                                    <div class="job-detail-item">
                                        ${Icons.award} <strong>Experience Required:</strong> ${job.experience}
                                    </div>
                                    <div class="job-detail-item">
                                        ${Icons.clock} <strong>Posted Date:</strong> ${job.postedDate}
                                    </div>
                                </div>
                                
                                <h4 class="job-modal-section-title">Job Description</h4>
                                <p class="profile-text-block">${job.description}</p>
                                
                                <h4 class="job-modal-section-title">Core Requirements</h4>
                                <ul class="job-modal-list">
                                    ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                                </ul>
                                
                                <h4 class="job-modal-section-title">Key Competencies Sought</h4>
                                <div class="skills-container mt-4">
                                    ${job.skills.map(s => `<span class="skill-tag" style="font-size: 0.8rem; padding: 0.25rem 0.65rem;">${s}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" onclick="window.closeAllModals()">Close</button>
                            ${hasApplied ? 
                                `<button class="btn btn-applied" disabled>${Icons.checkCircle} Application Submitted</button>` : 
                                `<button class="btn btn-success" onclick="window.openApplyModal('${job.id}')">Apply For Job</button>`
                            }
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    // 2. Job Application Form Modal
    if (state.showApplyFormForId) {
        const job = state.jobs.find(j => j.id === state.showApplyFormForId);
        if (job) {
            overlayHtml += `
                <div class="modal-overlay active" onclick="window.closeAllModals(event)">
                    <div class="modal-content" onclick="event.stopPropagation()">
                        <div class="modal-header">
                            <h3 class="modal-title">Job Application form</h3>
                            <button class="modal-close-btn" onclick="window.closeAllModals()">${Icons.close}</button>
                        </div>
                        <form id="apply-job-form" onsubmit="window.submitJobApplication(event, '${job.id}')">
                            <div class="modal-body" style="max-height: 60vh;">
                                <div style="margin-bottom: 1.25rem; background: var(--bg-tertiary); padding: 0.8rem 1.2rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                                    <div style="font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Role Applying For:</div>
                                    <div style="font-size: 1.1rem; font-weight: 700; color: var(--color-secondary);">${job.title}</div>
                                    <div style="font-size: 0.85rem; color: var(--text-muted);">${job.company} • ${job.location}</div>
                                </div>
                                
                                <div class="edit-form-row">
                                    <div class="form-group">
                                        <label class="form-label">Full Name</label>
                                        <input type="text" id="apply-name" class="input-control" value="${state.user.name}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Email Address</label>
                                        <input type="email" id="apply-email" class="input-control" value="${state.user.email}" required>
                                    </div>
                                </div>
                                
                                <div class="edit-form-row">
                                    <div class="form-group">
                                        <label class="form-label">Phone Number</label>
                                        <input type="text" id="apply-phone" class="input-control" value="${state.user.phone}" required>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Education (Degree & University)</label>
                                    <input type="text" id="apply-education" class="input-control" value="${state.user.education.degree} - ${state.user.education.school}" required>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Key Skills</label>
                                    <input type="text" id="apply-skills" class="input-control" value="${state.user.skills.join(', ')}" required>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Years of Experience</label>
                                    <input type="text" id="apply-experience" class="input-control" value="${state.user.experience.role} at ${state.user.experience.company} (${state.user.experience.duration})" required>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Upload Resume (PDF, DOCX)</label>
                                    <input type="file" id="apply-resume" class="input-control" accept=".pdf,.doc,.docx" required>
                                    <span style="font-size: 0.75rem; color: var(--text-dim);">Supported extensions: .pdf, .doc, .docx</span>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Cover Letter</label>
                                    <textarea id="apply-coverletter" class="input-control textarea-control" placeholder="Write a short cover letter stating why you are a good fit for this role..." required minlength="20"></textarea>
                                </div>
                            </div>
                            
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" onclick="window.closeAllModals()">Cancel</button>
                                <button type="submit" class="btn btn-success">Submit Application</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
        }
    }
    
    // 3. Logout Confirmation Modal
    if (state.isLogoutConfirmOpen) {
        overlayHtml += `
            <div class="modal-overlay active" onclick="window.closeAllModals(event)">
                <div class="modal-content modal-sm" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3 class="modal-title">Confirm Logout</h3>
                        <button class="modal-close-btn" onclick="window.closeAllModals()">${Icons.close}</button>
                    </div>
                    <div class="modal-body text-center" style="padding: 2rem 1.5rem;">
                        <div style="color: #ef4444; margin-bottom: 1rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle" style="display:inline-block"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        </div>
                        <h4 style="margin-bottom: 0.5rem; font-size: 1.1rem;">Are you sure you want to log out?</h4>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">You will need to sign back in to access your dashboard and active application tracks.</p>
                    </div>
                    <div class="modal-footer" style="justify-content: center; gap: 1rem;">
                        <button class="btn btn-secondary" style="width: 100px;" onclick="window.closeAllModals()">Cancel</button>
                        <button class="btn btn-danger" style="width: 100px;" onclick="window.executeLogout()">Logout</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    return overlayHtml;
}

// MODAL LISTENERS AND CONTROLLERS
window.openJobDetails = function(jobId) {
    state.selectedJobId = jobId;
    renderApp();
};

window.openApplyModal = function(jobId) {
    state.selectedJobId = null; // Close details modal if open
    state.showApplyFormForId = jobId;
    renderApp();
};

window.confirmLogout = function() {
    state.isLogoutConfirmOpen = true;
    renderApp();
};

window.executeLogout = function() {
    localStorage.removeItem('recruitment_applicant_session');
    state.isLogoutConfirmOpen = false;
    state.view = 'login';
    showToast("Logged out successfully.");
    renderApp();
};

window.closeAllModals = function(e) {
    state.selectedJobId = null;
    state.showApplyFormForId = null;
    state.isLogoutConfirmOpen = false;
    renderApp();
};

// SUBMIT JOB APPLICATION LOGIC
window.submitJobApplication = function(e, jobId) {
    e.preventDefault();
    
    const resumeInput = document.getElementById('apply-resume');
    if (!resumeInput.files || resumeInput.files.length === 0) {
        showToast("Please upload a valid resume file.", "error");
        return;
    }
    
    const file = resumeInput.files[0];
    const extension = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'doc', 'docx'].includes(extension)) {
        showToast("Invalid file extension. Please upload a .pdf or .doc/docx file.", "error");
        return;
    }
    
    const newApp = {
        id: "app-" + Date.now(),
        jobId: jobId,
        appliedDate: new Date().toISOString().split('T')[0],
        status: "Applied",
        resumeName: file.name,
        coverLetter: document.getElementById('apply-coverletter').value.trim()
    };
    
    state.applications.push(newApp);
    saveState();
    
    state.showApplyFormForId = null;
    showToast("Application submitted successfully!");
    renderApp();
};

// FILTER MANIPULATION ACTIONS
window.updateFilterSearch = function(val) {
    state.filters.search = val;
    
    // Rerender job list results inline without tearing down the input state/focus
    debounceFilterRender();
};

window.updateFilterLocation = function(val) {
    state.filters.location = val;
    renderApp();
};

window.updateFilterJobType = function(val, checked) {
    if (checked) {
        state.filters.jobTypes.push(val);
    } else {
        state.filters.jobTypes = state.filters.jobTypes.filter(t => t !== val);
    }
    renderApp();
};

window.updateFilterExperience = function(val) {
    state.filters.experience = val;
    renderApp();
};

window.clearAllFilters = function() {
    state.filters = {
        search: '',
        location: '',
        jobTypes: [],
        experience: ''
    };
    renderApp();
};

// Debounce keyboard filter search updates
let debounceTimer;
function debounceFilterRender() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        // Find existing list container and update it
        const gridSection = document.querySelector('.jobs-grid-section');
        if (gridSection) {
            // Re-render the HTML content of jobs section
            const countEl = document.querySelector('.results-count span');
            const listEl = document.querySelector('.jobs-list');
            
            const filteredJobs = state.jobs.filter(job => {
                if (state.filters.search) {
                    const query = state.filters.search.toLowerCase();
                    const titleMatch = job.title.toLowerCase().includes(query);
                    const compMatch = job.company.toLowerCase().includes(query);
                    const skillMatch = job.skills.some(s => s.toLowerCase().includes(query));
                    if (!titleMatch && !compMatch && !skillMatch) return false;
                }
                if (state.filters.location && job.location !== state.filters.location) return false;
                if (state.filters.jobTypes.length > 0 && !state.filters.jobTypes.includes(job.jobType)) return false;
                if (state.filters.experience && !job.experience.toLowerCase().startsWith(state.filters.experience.toLowerCase())) return false;
                return true;
            });
            
            if (countEl) countEl.innerText = filteredJobs.length;
            if (listEl) {
                listEl.innerHTML = filteredJobs.length > 0 ? 
                    filteredJobs.map(job => renderJobCardMarkup(job)).join('') : 
                    `<div class="empty-state glass-panel">
                        <div class="empty-state-icon">${Icons.info}</div>
                        <h3>No job listings match your filters</h3>
                        <p>Try resetting filters or search for another keyword like "React" or "SQL".</p>
                        <button class="btn btn-primary" onclick="window.clearAllFilters()">Reset Search</button>
                     </div>`;
            }
        }
    }, 200);
}

// SETUP GENERAL DOM EVENT LISTENERS
function setupGlobalListeners() {
    // Escape key closes modals
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.key === "Escape") {
            window.closeAllModals();
        }
    };
}

// Window globally binding
window.switchView = switchView;
window.confirmLogout = confirmLogout;
window.executeLogout = executeLogout;
window.closeAllModals = closeAllModals;

// Self Start Entry Point
initDatabase();
renderApp();
