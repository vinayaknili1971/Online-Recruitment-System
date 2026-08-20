# Online Recruitment System — Secure Full-Stack Edition

A recruitment system with separate Applicant and Admin modules, now backed
by a real Node.js/Express API and MySQL database instead of `localStorage`.

## What changed from the static version

The original app kept all data (users, jobs, applications) in the
browser's `localStorage`, and decided whether someone was an admin
purely in frontend JavaScript (`shared/db.js`, checked in `admin.js`).
That meant:

- Anyone could open the browser console and edit their own session
  object to say `role: "admin"`.
- Anyone could navigate straight to `admin.html` and use the whole
  admin UI — the "protection" was just that the link wasn't shown.
- Passwords were stored in plaintext in `localStorage`.

This version fixes all of that:

- **All data lives in MySQL**, accessed only through the backend.
- **Every admin API route requires a real, server-side session** that
  was created by successfully logging in with a database account whose
  `role` column is `admin`. The frontend never sends a role — the
  server looks it up.
- **Passwords are bcrypt-hashed**, never stored or compared in
  plaintext.
- **Sessions are HTTP-only, signed cookies.** Frontend JavaScript can't
  read or forge them.
- The `/admin` and `/applicant` static routes are also gated by session
  checks on the server (see "Note on protecting static admin pages"
  below) — but the real boundary is the API, not the page.

## Folder structure

```
Online-Recruitment-System/
├── frontend/
│   ├── login/          <- Start here: shared login + registration
│   ├── admin/           <- Admin console (calls /api/admin/*, /api/jobs)
│   ├── applicant/        <- Applicant SPA (calls /api/applicant/*, /api/jobs)
│   └── shared/
│       └── apiClient.js  <- fetch() wrapper used by all three pages
├── server/
│   ├── app.js            <- Express app: middleware, routes, static serving
│   ├── server.js          <- Entry point (loads .env, connects to MySQL, listens)
│   ├── config/db.js        <- MySQL connection pool
│   ├── controllers/         <- Route handlers (business logic + queries)
│   ├── middleware/
│   │   ├── authMiddleware.js  <- requireAuth (401 if not logged in)
│   │   └── roleMiddleware.js  <- requireAdmin / requireApplicant (403 if wrong role)
│   ├── routes/               <- authRoutes, jobRoutes, applicantRoutes, adminRoutes
│   └── utils/
│       ├── validators.js       <- server-side input validation
│       ├── idFormat.js          <- formats numeric MySQL ids as "job-3" / "app-12"
│       │                          to match the existing frontend's expectations
│       └── createAdmin.js        <- CLI script to create/reset an admin account
├── database/
│   └── schema.sql
├── .env.example
├── .gitignore
└── package.json
```

## 1. Install dependencies

```bash
cd Online-Recruitment-System
npm install
```

> This sandbox had no network access, so dependencies could not be
> installed or the server run live here. Every file was syntax-checked
> with `node --check` and the auth/authorization logic was traced by
> hand against the test scenarios below — but you should run the Testing
> section yourself before relying on this in production.

## 2. Set up MySQL

Create the database and tables:

```bash
mysql -u root -p < database/schema.sql
```

This creates the `recruitment_system` database, all four tables, and
two sample job postings. **It does not create any user accounts** —
passwords need to go through bcrypt at run time rather than being
pasted into a `.sql` file as a pre-computed hash, so accounts are
created by the scripts in the next two steps.

## 3. Create your `.env`

```bash
cp .env.example .env
```

Fill in `DB_USER` / `DB_PASSWORD` for your MySQL install, and generate a
`SESSION_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Paste the output in as `SESSION_SECRET=...`. Never commit `.env` — it's
already in `.gitignore`.

## 4. Create accounts

Admin account (choose your own email/password):

```bash
npm run create-admin -- admin@recruiter.com "ChangeThisPassword123"
```

This hashes the password with bcrypt and inserts (or updates) a user
row with `role = 'admin'`. There is no hardcoded admin password
anywhere in the source code.

Demo applicant accounts (optional, matches the two names referenced
throughout the README/UI):

```bash
npm run seed-demo-users
```

Creates `jane.doe@example.com` and `john.smith@example.com`, both with
password `applicant123`, hashed the same way real registration does.

## 5. Start the backend

```bash
npm run dev     # nodemon, auto-restarts on changes
# or
npm start       # plain node
```

You should see:

```
Server running on http://localhost:5000
```

If MySQL isn't reachable, the server prints a clear error and exits
instead of starting broken — check `.env`.

## 6. Open the application

**http://localhost:5000/login/index.html**

Express serves the frontend directly — there's no separate frontend
server or build step needed for this version (the old `vite`
dev-dependency in `package.json` has been removed since it's no longer
used).

## Demo accounts

| Role      | Email                     | Password              |
|-----------|---------------------------|------------------------|
| Applicant | jane.doe@example.com      | applicant123           |
| Applicant | john.smith@example.com    | applicant123           |
| Admin     | (whatever you created in step 4) |                 |

## API summary

| Method | Path                            | Auth required        |
|--------|----------------------------------|-----------------------|
| GET    | /api/health                       | none                   |
| POST   | /api/auth/register                 | none                    |
| POST   | /api/auth/login                     | none                     |
| POST   | /api/auth/logout                     | none (clears session)    |
| GET    | /api/auth/me                          | any logged-in user        |
| GET    | /api/jobs                              | any logged-in user          |
| GET    | /api/applicant/profile                  | applicant                    |
| PUT    | /api/applicant/profile                   | applicant                     |
| GET    | /api/applicant/applications                | applicant                      |
| POST   | /api/applicant/applications                 | applicant                       |
| POST   | /api/admin/jobs                              | admin                             |
| PUT    | /api/admin/jobs/:id                           | admin                              |
| DELETE | /api/admin/jobs/:id                            | admin                               |
| GET    | /api/admin/applications                         | admin                                |
| PUT    | /api/admin/applications/:id                      | admin                                 |
| GET    | /api/admin/candidates                             | admin                                  |

## Note on protecting static admin pages

`admin.html`, `applicant.js`, etc. are still plain static files served
by Express — there's no server-side rendering in this version. To stop
a logged-out or non-admin browser from even receiving the admin HTML,
`server/app.js` puts a session check in front of `express.static` for
`/admin` and `/applicant`, redirecting to `/login` when it fails.

That said, **this is defense-in-depth, not the real security
boundary.** The actual guarantee is that every `/api/admin/*` and
`/api/applicant/*` endpoint independently re-checks the session and
role with `requireAuth`/`requireAdmin`/`requireApplicant` middleware —
so even if someone found a way to view the admin HTML/JS, every data
request it makes would still be rejected with 401/403. Don't rely on
hiding the page; rely on the API checks.

## Security checklist

- [x] Passwords hashed with bcrypt (`bcryptjs`, cost factor 10) — never
      stored or logged in plaintext.
- [x] Role comes only from `req.session.user.role`, set at login from
      the `users.role` database column — never from `req.body.role` or
      any other client-supplied value.
- [x] Every `/api/admin/*` route requires `requireAuth` + `requireAdmin`.
- [x] Every `/api/applicant/*` route requires `requireAuth` +
      `requireApplicant`, and scopes all queries to
      `req.session.user.id` — there is no `:id` in these URLs for a
      client to tamper with.
- [x] Session cookie is `httpOnly`, `sameSite: 'lax'`, and `secure` in
      production — not readable or forgeable by frontend JS.
- [x] `helmet` sets standard security headers (CSP, etc.).
- [x] CORS is locked to same-origin by default (`credentials: true`
      only for the configured origin).
- [x] Login and registration are rate-limited (10 attempts / 15 min).
- [x] All SQL is parameterized (`mysql2` `?` placeholders) — no string
      concatenation of user input into queries.
- [x] Server-side validation on every write endpoint (see
      `server/utils/validators.js`), independent of frontend checks.
- [x] Error responses never include stack traces, SQL errors, or file
      paths — see the central error handler in `server/app.js` and the
      generic `catch` blocks in every controller.
- [x] `.env` (real secrets) is gitignored; only `.env.example` (no real
      values) is committed.

## Testing

Run these manually against your local server before trusting this in
any real deployment — they were not executed live in this sandbox.

1. **Applicant login** → `/applicant/index.html` loads;
   `/admin/admin.html` redirects to login if you try to navigate there
   directly in the same browser session.
2. **Admin login** → `/admin/admin.html` loads; dashboard/jobs/
   applications/candidates all populate from the database.
3. **Unauthenticated admin API**: `curl -i http://localhost:5000/api/admin/candidates`
   → expect `401`.
4. **Applicant calling admin API**: log in as an applicant, then
   `curl -i --cookie "recruit.sid=<value from browser>" http://localhost:5000/api/admin/candidates`
   → expect `403`.
5. **Direct admin URL while logged out**: visit
   `http://localhost:5000/admin/admin.html` in an incognito window →
   expect a redirect to `/login/index.html`.
6. **Cross-applicant access**: there is no endpoint that accepts
   another applicant's id at all (`/api/applicant/*` always uses the
   session's own id), so this class of bug is structurally not
   possible rather than something to probe for — confirm by reading
   `server/controllers/applicantController.js`.
7. **Wrong password** → `401` from `/api/auth/login`.
8. **SQL injection attempt**: try an email like `' OR '1'='1` in the
   login form → since every query uses parameterized placeholders, this
   is treated as a literal string and simply fails to match, returning
   the normal `401`.
