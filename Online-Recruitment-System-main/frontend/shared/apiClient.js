/* =====================================================================
   API CLIENT
   Talks to the real Express/MySQL backend. Replaces the old
   shared/db.js localStorage layer. Every request sends the session
   cookie (credentials: 'include') so the server — not this file — is
   what decides who the caller is and what they're allowed to do.

   Include this BEFORE login.js / admin.js / applicant.js:
     <script src="../shared/apiClient.js"></script>
   ===================================================================== */

(function () {
  async function request(path, options = {}) {
    const res = await fetch('/api' + path, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      ...options
    });

    let data = null;
    try { data = await res.json(); } catch (e) { /* no body */ }

    if (!res.ok) {
      const message = (data && data.message) || `Request failed (${res.status})`;
      const error = new Error(message);
      error.status = res.status;
      error.payload = data;
      throw error;
    }
    return data;
  }

  const RecruitAPI = {
    // ---- Auth ----
    login(email, password) {
      return request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    },
    register(name, email, password) {
      return request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
    },
    logout() {
      return request('/auth/logout', { method: 'POST' });
    },
    me() {
      return request('/auth/me', { method: 'GET' });
    },

    // ---- Jobs (shared by applicant browse + admin table) ----
    getJobs() {
      return request('/jobs', { method: 'GET' }).then(r => r.jobs);
    },
    createJob(job) {
      return request('/admin/jobs', { method: 'POST', body: JSON.stringify(job) }).then(r => r.job);
    },
    updateJob(jobId, job) {
      return request(`/admin/jobs/${encodeURIComponent(jobId)}`, { method: 'PUT', body: JSON.stringify(job) }).then(r => r.job);
    },
    deleteJob(jobId) {
      return request(`/admin/jobs/${encodeURIComponent(jobId)}`, { method: 'DELETE' });
    },

    // ---- Applicant ----
    getProfile() {
      return request('/applicant/profile', { method: 'GET' }).then(r => r.profile);
    },
    saveProfile(profile) {
      return request('/applicant/profile', { method: 'PUT', body: JSON.stringify(profile) });
    },
    getMyApplications() {
      return request('/applicant/applications', { method: 'GET' }).then(r => r.applications);
    },
    submitApplication(jobId, resumeName, coverLetter) {
      return request('/applicant/applications', {
        method: 'POST',
        body: JSON.stringify({ jobId, resumeName, coverLetter })
      }).then(r => r.application);
    },

    // ---- Admin ----
    getAllApplications() {
      return request('/admin/applications', { method: 'GET' }).then(r => r.applications);
    },
    updateApplicationStatus(appId, status) {
      return request(`/admin/applications/${encodeURIComponent(appId)}`, { method: 'PUT', body: JSON.stringify({ status }) });
    },
    getCandidateDirectory() {
      return request('/admin/candidates', { method: 'GET' }).then(r => r.candidates);
    }
  };

  window.RecruitAPI = RecruitAPI;
})();
