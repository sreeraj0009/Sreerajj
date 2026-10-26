# Feedback Admin Panel

A polished React + Vite feedback dashboard with animated gradient backgrounds, responsive layouts, course rating summaries, and an Add Feedback form. The frontend includes a local demo mode so it works immediately without a database.

## Run locally
1. Install Node.js LTS from https://nodejs.org/ (this installs `node` and `npm`).
2. Open this folder in a terminal.
3. Run `npm install --prefix frontend`
4. Run `npm run dev --prefix frontend`
5. Open the localhost URL printed in the terminal.

## GitHub Pages deployment (frontend)
GitHub Pages hosts static frontends, not an Express/MongoDB server. This project uses Vite and is configured for a repository named `feedback-admin-panel`.
1. Push the project to a GitHub repository named `feedback-admin-panel`.
2. In the `frontend` folder run `npm install` then `npm run deploy`.
3. In GitHub, open Settings → Pages and select the `gh-pages` branch if prompted.

If you use a different repository name, update `base` in `frontend/vite.config.js` to `'/YOUR-REPOSITORY-NAME/'`.

## Optional API backend
The Express/MongoDB starter is in `backend/`. Set `MONGO_URI` in your environment, install dependencies with `npm install --prefix backend`, then run `npm run dev --prefix backend`. To make API calls from the hosted frontend, deploy the backend separately (for example to Render) and configure `VITE_API_URL` in `frontend/.env`.

## Notes
- Demo mode stores submitted feedback in browser localStorage, making the UI usable without backend setup.
- Replace demo data and add your own project details before submitting. Make sure you understand and can explain the code during evaluation.
