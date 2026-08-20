// ================= BACKEND API ACCESS =================
// Jobs, applications, and the candidate directory now come from the
// real Express/MySQL backend (shared/apiClient.js -> RecruitAPI)
// instead of localStorage. Every admin.js call below hits an endpoint
// that independently requires an authenticated admin session — this
// file has no special access of its own.

async function getJobs() {
  return RecruitAPI.getJobs();
}

async function getApplicants() {
  return RecruitAPI.getCandidateDirectory();
}

async function getApplications() {
  return RecruitAPI.getAllApplications();
}

// ================= NAVIGATION & VIEW SWITCHING =================
const views = {
  appLayout: document.getElementById('app-layout'),
  dashboard: document.getElementById('dashboard-view'),
  jobs: document.getElementById('jobs-view'),
  applications: document.getElementById('applications-view'),
  applicants: document.getElementById('applicants-view')
};

const viewTitles = {
  dashboard: 'Console Dashboard',
  jobs: 'Job Postings Management',
  applications: 'Applications Review Board',
  applicants: 'Candidate Directory'
};

function switchView(viewKey) {
  // Hide all sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.add('hidden');
    section.classList.remove('active-view');
  });

  // Show target view
  if (views[viewKey]) {
    views[viewKey].classList.remove('hidden');
    views[viewKey].classList.add('active-view');
  }

  // Update header text
  document.querySelector('.main-header h2').textContent = viewTitles[viewKey] || 'Admin Console';

  // Toggle active class on sidebar buttons
  document.querySelectorAll('.sidebar-nav .nav-link').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-view') === `${viewKey}-view`) {
      btn.classList.add('active');
    }
  });

  // Load appropriate data
  if (viewKey === 'dashboard') loadDashboard();
  if (viewKey === 'jobs') loadJobsTable();
  if (viewKey === 'applications') loadApplicationsTable();
  if (viewKey === 'applicants') loadApplicantsTable();
}

// Verifies the session with the server (GET /api/auth/me) rather than
// trusting anything stored client-side. If the server says there's no
// valid admin session, the admin console never renders — this is a UX
// nicety on top of the fact that every admin API call below is
// independently re-checked server-side regardless of what this page does.
async function checkAdminAuthRedirect() {
  let me;
  try {
    me = (await RecruitAPI.me()).user;
  } catch (e) {
    window.location.href = '/login/index.html';
    return;
  }

  if (!me || me.role !== 'admin') {
    window.location.href = '/login/index.html';
    return;
  }

  const nameEl = document.getElementById('admin-display-name');
  const avatarEl = document.getElementById('admin-avatar-initial');
  if (nameEl) nameEl.textContent = me.name || me.email;
  if (avatarEl) avatarEl.textContent = (me.name || me.email).charAt(0).toUpperCase();

  views.appLayout.classList.remove('hidden');
  switchView('dashboard');
}

// Event Listeners for Navigation Buttons
document.querySelectorAll('.sidebar-nav .nav-link[data-view]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const viewKey = btn.getAttribute('data-view').replace('-view', '');
    switchView(viewKey);
  });
});

// Logout Event Listener
document.getElementById('btn-logout').addEventListener('click', async () => {
  try {
    await RecruitAPI.logout();
  } catch (e) {
    // Still redirect even if the request itself failed.
  }
  window.location.href = '/login/index.html';
});

// Toast Utility
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast-notification');
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 4000);
}


// ================= AUTHENTICATION =================
// Login now happens on the shared /login page (see ../login/login.js).
// checkAdminAuthRedirect(), called on DOMContentLoaded below, verifies
// the shared session and sends the user back to /login if it's missing
// or belongs to a non-admin account.


// ================= DASHBOARD CONTROLLER =================
async function loadDashboard() {
  const [jobs, apps, candidates] = await Promise.all([getJobs(), getApplications(), getApplicants()]);

  // Set counter displays
  document.getElementById('stat-jobs').textContent = jobs.length;
  document.getElementById('stat-apps').textContent = apps.length;
  document.getElementById('stat-candidates').textContent = candidates.length;

  // Load Recent Applications (limit 5)
  const recentAppsTbody = document.getElementById('dash-recent-apps');
  recentAppsTbody.innerHTML = '';
  
  const recentApps = [...apps].reverse().slice(0, 5);
  
  if (recentApps.length === 0) {
    recentAppsTbody.innerHTML = `<tr><td colspan="4" class="empty-state" style="text-align: center; padding: 1.5rem; color: var(--text-muted);">No applications submitted yet.</td></tr>`;
  } else {
    recentApps.forEach(app => {
      let statusClass = 'badge-pending';
      if (app.status === 'Shortlisted') statusClass = 'badge-shortlisted';
      if (app.status === 'Selected') statusClass = 'badge-selected';
      if (app.status === 'Rejected') statusClass = 'badge-rejected';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 500;">${escapeHTML(app.applicantName)}</td>
        <td>${escapeHTML(app.jobTitle)}</td>
        <td>${app.appliedDate}</td>
        <td><span class="badge ${statusClass}">${app.status}</span></td>
      `;
      recentAppsTbody.appendChild(tr);
    });
  }

  // Load Active Jobs list
  const recentJobsTbody = document.getElementById('dash-recent-jobs');
  recentJobsTbody.innerHTML = '';
  
  const recentJobs = [...jobs].reverse().slice(0, 5);
  
  if (recentJobs.length === 0) {
    recentJobsTbody.innerHTML = `<tr><td colspan="3" class="empty-state" style="text-align: center; padding: 1.5rem; color: var(--text-muted);">No active job postings.</td></tr>`;
  } else {
    recentJobs.forEach(job => {
      const appCount = apps.filter(a => a.jobId === job.id).length;
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 500;">${escapeHTML(job.title)}</td>
        <td><span style="font-size: 0.8rem; font-weight:600; padding: 0.2rem 0.4rem; background-color: var(--primary-light); color: var(--primary); border-radius: var(--radius-sm);">${job.jobType}</span></td>
        <td><strong>${appCount}</strong> candidate${appCount === 1 ? '' : 's'}</td>
      `;
      recentJobsTbody.appendChild(tr);
    });
  }
}


// ================= JOBS MANAGEMENT CONTROLLER =================
const jobModalOverlay = document.getElementById('job-form-overlay');
const jobForm = document.getElementById('job-editor-form');

async function loadJobsTable() {
  const jobs = await getJobs();
  const tbody = document.getElementById('jobs-table-body');
  tbody.innerHTML = '';

  if (jobs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">No job opportunities listed. Click 'Add New Job' to create one.</td></tr>`;
    return;
  }

  jobs.forEach(job => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight: 500;">${escapeHTML(job.title)}</td>
      <td>${escapeHTML(job.company)}</td>
      <td>${escapeHTML(job.location)}</td>
      <td>${job.jobType}</td>
      <td>${job.experience}</td>
      <td>${job.deadline}</td>
      <td class="actions-cell">
        <button class="btn btn-outline" style="padding: 0.35rem 0.75rem;" data-action="edit-job" data-job-id="${job.id}">Edit</button>
        <button class="btn btn-danger-outline" style="padding: 0.35rem 0.75rem;" data-action="delete-job" data-job-id="${job.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function openJobModal(jobId = '') {
  jobForm.reset();
  
  if (jobId) {
    // Edit Mode
    const jobs = await getJobs();
    const job = jobs.find(j => j.id === jobId);
    
    if (!job) {
      showToast('Error finding job details', 'error');
      return;
    }

    document.getElementById('job-modal-title').textContent = 'Edit Job Posting';
    document.getElementById('job-id').value = job.id;
    document.getElementById('job-title').value = job.title;
    document.getElementById('job-company').value = job.company;
    document.getElementById('job-location').value = job.location;
    document.getElementById('job-salary').value = job.salary;
    document.getElementById('job-type').value = job.jobType;
    document.getElementById('job-experience').value = job.experience;
    document.getElementById('job-skills').value = job.skills.join(', ');
    document.getElementById('job-deadline').value = job.deadline;
    document.getElementById('job-description').value = job.description;
    document.getElementById('job-requirements').value = (job.requirements || []).join('\n');
  } else {
    // Create Mode
    document.getElementById('job-modal-title').textContent = 'Create Job Posting';
    document.getElementById('job-id').value = '';
  }

  jobModalOverlay.classList.remove('hidden');
}

// Modal closing helpers
document.getElementById('btn-close-job-modal').addEventListener('click', () => {
  jobModalOverlay.classList.add('hidden');
});

document.getElementById('btn-cancel-job-form').addEventListener('click', () => {
  jobModalOverlay.classList.add('hidden');
});

document.getElementById('btn-add-job').addEventListener('click', () => {
  openJobModal();
});

// Job Form Submit Listener
// Creates/updates go straight to the backend (POST/PUT /api/admin/jobs)
// instead of rewriting a whole local jobs array — the server re-validates
// every field and re-checks the admin role independently of this form.
jobForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const jobId = document.getElementById('job-id').value;
  const title = document.getElementById('job-title').value.trim();
  const company = document.getElementById('job-company').value.trim();
  const location = document.getElementById('job-location').value.trim();
  const salary = document.getElementById('job-salary').value.trim();
  const jobType = document.getElementById('job-type').value;
  const experience = document.getElementById('job-experience').value;
  const skillsText = document.getElementById('job-skills').value.trim();
  const deadline = document.getElementById('job-deadline').value;
  const description = document.getElementById('job-description').value.trim();
  const requirementsText = document.getElementById('job-requirements').value.trim();

  if (!title || !company || !location || !salary || !skillsText || !deadline || !description || !requirementsText) {
    showToast('Please fill out all fields', 'error');
    return;
  }

  // Parse skills and requirements (one requirement per line)
  const skillsArray = skillsText.split(',').map(s => s.trim()).filter(s => s.length > 0);
  const requirementsArray = requirementsText.split('\n').map(r => r.trim()).filter(r => r.length > 0);

  const jobPayload = { title, company, location, salary, jobType, experience, skills: skillsArray, deadline, description, requirements: requirementsArray };

  try {
    if (jobId) {
      await RecruitAPI.updateJob(jobId, jobPayload);
      showToast('Job posting modified successfully', 'success');
    } else {
      await RecruitAPI.createJob(jobPayload);
      showToast('New job opportunity published', 'success');
    }
    await loadJobsTable();
    jobModalOverlay.classList.add('hidden');
  } catch (err) {
    showToast(err.message || 'Could not save job posting.', 'error');
  }
});

// Delete job handler
async function deleteJob(jobId) {
  if (confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
    try {
      await RecruitAPI.deleteJob(jobId);
      await loadJobsTable();
      showToast('Job posting deleted successfully', 'success');
    } catch (err) {
      showToast(err.message || 'Could not delete job posting.', 'error');
    }
  }
}


// ================= APPLICATIONS REVIEW BOARD CONTROLLER =================
const appModalOverlay = document.getElementById('app-modal-overlay');

async function loadApplicationsTable() {
  const apps = await getApplications();
  const tbody = document.getElementById('applications-table-body');
  tbody.innerHTML = '';

  if (apps.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">No candidate applications have been submitted yet.</td></tr>`;
    return;
  }

  apps.forEach(app => {
    let statusClass = 'badge-pending';
    if (app.status === 'Shortlisted') statusClass = 'badge-shortlisted';
    if (app.status === 'Selected') statusClass = 'badge-selected';
    if (app.status === 'Rejected') statusClass = 'badge-rejected';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight: 600; color: var(--primary);">${app.id}</td>
      <td style="font-weight: 500;">${escapeHTML(app.applicantName)}</td>
      <td>${escapeHTML(app.jobTitle)}</td>
      <td>${app.appliedDate}</td>
      <td style="font-size: 0.825rem; color: var(--primary);">${escapeHTML(app.resumeName)}</td>
      <td><span class="badge ${statusClass}">${app.status}</span></td>
      <td class="actions-cell">
        <button class="btn btn-outline" style="padding: 0.35rem 0.75rem;" data-action="review-application" data-app-id="${app.id}">Review</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function reviewApplication(appId) {
  const apps = await getApplications();
  const app = apps.find(a => a.id === appId);

  if (!app) {
    showToast('Application record not found', 'error');
    return;
  }

  const modalContent = document.getElementById('app-details-modal-content');
  modalContent.innerHTML = `
    <div class="app-detail-modal-body">
      <div class="detail-grid">
        <div class="detail-item">
          <label>Application ID</label>
          <p style="color: var(--primary); font-weight: 600;">${app.id}</p>
        </div>
        <div class="detail-item">
          <label>Applied Date</label>
          <p>${app.appliedDate}</p>
        </div>
        <div class="detail-item">
          <label>Job Title</label>
          <p style="font-weight: 600;">${escapeHTML(app.jobTitle)}</p>
        </div>
        <div class="detail-item">
          <label>Company</label>
          <p>${escapeHTML(app.company)}</p>
        </div>
        <div class="detail-item">
          <label>Candidate Name</label>
          <p style="font-weight: 600;">${escapeHTML(app.applicantName)}</p>
        </div>
        <div class="detail-item">
          <label>Phone Number</label>
          <p>${escapeHTML(app.applicantPhone)}</p>
        </div>
        <div class="detail-item">
          <label>Candidate Email</label>
          <p>${escapeHTML(app.applicantEmail)}</p>
        </div>
        <div class="detail-item">
          <label>Submitted Resume</label>
          <p style="color: var(--primary);">${escapeHTML(app.resumeName)}</p>
        </div>
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <label style="display: block; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600; margin-bottom: 0.25rem;">Cover Letter</label>
        <div class="detail-cover-letter">${escapeHTML(app.coverLetter)}</div>
      </div>
      
      <div style="border-top: 1px solid var(--border); padding-top: 1.25rem; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <label for="change-app-status" style="font-size: 0.8125rem; font-weight: 600; margin-right: 0.5rem;">Workflow Status:</label>
          <select id="change-app-status" style="width: auto; display: inline-block;">
            <option value="Pending" ${app.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Shortlisted" ${app.status === 'Shortlisted' ? 'selected' : ''}>Shortlisted</option>
            <option value="Selected" ${app.status === 'Selected' ? 'selected' : ''}>Selected</option>
            <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
          </select>
        </div>
        <button class="btn btn-primary" data-action="update-application-status" data-app-id="${app.id}">Update Status</button>
      </div>
    </div>
  `;

  appModalOverlay.classList.remove('hidden');
}

document.getElementById('btn-close-app-modal').addEventListener('click', () => {
  appModalOverlay.classList.add('hidden');
});

// Update Application Status logic
window.updateApplicationStatus = async function(appId) {
  const statusSelect = document.getElementById('change-app-status');
  const newStatus = statusSelect.value;

  try {
    await RecruitAPI.updateApplicationStatus(appId, newStatus);
    await loadApplicationsTable();
    appModalOverlay.classList.add('hidden');
    showToast(`Application status updated to ${newStatus}`, 'success');
  } catch (err) {
    showToast(err.message || 'Failed to update status.', 'error');
  }
};


// ================= CANDIDATE DIRECTORY CONTROLLER =================
async function loadApplicantsTable() {
  const applicants = await getApplicants();
  const tbody = document.getElementById('applicants-table-body');
  tbody.innerHTML = '';

  if (applicants.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">No candidates have registered on the system yet.</td></tr>`;
    return;
  }

  applicants.forEach(candidate => {
    // Generate pills for skills (already an array from the shared database)
    const skillsArray = Array.isArray(candidate.skills) ? candidate.skills : [];
    const skillsHtml = skillsArray.length
      ? skillsArray.map(s => `<span class="skill-pill">${escapeHTML(s)}</span>`).join('')
      : `<span style="color: var(--text-muted); font-size: 0.8rem;">No skills listed</span>`;
    
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight: 500;">${escapeHTML(candidate.name)}</td>
      <td>${escapeHTML(candidate.email)}</td>
      <td>${escapeHTML(candidate.phone || 'Not provided')}</td>
      <td>${escapeHTML(candidate.education)}</td>
      <td style="max-width: 300px;">${skillsHtml}</td>
      <td style="font-size: 0.825rem; color: var(--primary); font-weight: 500;">${escapeHTML(candidate.resume || 'No active resume')}</td>
    `;
    tbody.appendChild(tr);
  });
}


// ================= UTILITIES =================
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Window actions helper mapping
window.openJobModal = openJobModal;
window.deleteJob = deleteJob;
window.reviewApplication = reviewApplication;

// CSP-safe delegated handlers for dynamically rendered admin controls.
document.addEventListener('click', (event) => {
  const el = event.target.closest('[data-action]');
  if (!el) return;
  switch (el.dataset.action) {
    case 'nav-click': document.getElementById(el.dataset.targetId)?.click(); break;
    case 'edit-job': openJobModal(el.dataset.jobId); break;
    case 'delete-job': deleteJob(el.dataset.jobId); break;
    case 'review-application': reviewApplication(el.dataset.appId); break;
    case 'update-application-status': updateApplicationStatus(el.dataset.appId); break;
  }
});

// Initialize Admin module on page load
window.addEventListener('DOMContentLoaded', () => {
  checkAdminAuthRedirect();
});
