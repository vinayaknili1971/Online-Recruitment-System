// If already logged in, skip straight to the right module. The server
// is the source of truth for this, via GET /api/auth/me — a stale or
// tampered client value can no longer send you anywhere.
(async function redirectIfLoggedIn() {
    try {
        const { user } = await RecruitAPI.me();
        window.location.href = user.role === 'admin' ? '/admin/admin.html' : '/applicant/index.html';
    } catch (e) {
        // Not logged in — stay on the login page.
    }
})();

const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginError = document.getElementById('login-error');
const loginBtnLabel = document.getElementById('login-btn-label');

const applicantTabBtn = document.getElementById('role-applicant-btn');
const adminTabBtn = document.getElementById('role-admin-btn');

const registerForm = document.getElementById('register-form');
const registerToggleRow = document.getElementById('register-toggle-row');
const registerLink = document.getElementById('register-link');
const backToLoginLink = document.getElementById('back-to-login-link');
const registerError = document.getElementById('register-error');

let activeRole = 'applicant';

const DEMO_CREDENTIALS = {
    applicant: { email: 'jane.doe@example.com', password: 'applicant123' },
    admin: { email: 'admin@recruiter.com', password: 'admin123' }
};

function setActiveRole(role) {
    activeRole = role;
    applicantTabBtn.classList.toggle('active', role === 'applicant');
    adminTabBtn.classList.toggle('active', role === 'admin');
    loginBtnLabel.textContent = role === 'admin' ? 'Sign In as Admin' : 'Sign In as Applicant';

    // Only swap the pre-filled demo values if the user hasn't typed their own.
    // Note: this only pre-fills the form field — it has no bearing on what
    // role the server actually grants after login, which comes from the
    // authenticated user's database record.
    if (Object.values(DEMO_CREDENTIALS).some(c => c.email === loginEmail.value)) {
        loginEmail.value = DEMO_CREDENTIALS[role].email;
        loginPassword.value = DEMO_CREDENTIALS[role].password;
    }
    hideError();
}

applicantTabBtn.addEventListener('click', () => setActiveRole('applicant'));
adminTabBtn.addEventListener('click', () => setActiveRole('admin'));

function showError(message) {
    loginError.textContent = message;
    loginError.classList.add('visible');
}

function hideError() {
    loginError.classList.remove('visible');
}

loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    hideError();

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    try {
        const { user } = await RecruitAPI.login(email, password);
        window.location.href = user.role === 'admin' ? '/admin/admin.html' : '/applicant/index.html';
    } catch (err) {
        showError(err.message || 'Incorrect email or password. Try one of the demo accounts below.');
    }
});

// ---------------- Registration (new applicants only) ----------------
registerLink.addEventListener('click', function (e) {
    e.preventDefault();
    loginForm.classList.add('hidden-form');
    registerToggleRow.classList.add('hidden-form');
    document.querySelector('.role-toggle').classList.add('hidden-form');
    document.querySelector('.demo-hint').classList.add('hidden-form');
    registerForm.classList.remove('hidden-form');
});

backToLoginLink.addEventListener('click', function (e) {
    e.preventDefault();
    registerForm.classList.add('hidden-form');
    loginForm.classList.remove('hidden-form');
    registerToggleRow.classList.remove('hidden-form');
    document.querySelector('.role-toggle').classList.remove('hidden-form');
    document.querySelector('.demo-hint').classList.remove('hidden-form');
});

registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    registerError.classList.remove('visible');

    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;

    if (!name || !email || !password) {
        registerError.textContent = 'Please fill out all fields.';
        registerError.classList.add('visible');
        return;
    }

    try {
        await RecruitAPI.register(name, email, password);
        window.location.href = '/applicant/index.html';
    } catch (err) {
        registerError.textContent = err.message || 'An account with that email already exists.';
        registerError.classList.add('visible');
    }
});

setActiveRole('applicant');
