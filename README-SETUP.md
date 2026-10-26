# Naduvan Industry — Setup and Deployment

## Frontend

The React + Vite frontend lives in `frontend/`. Bootstrap 5.3 CSS is loaded from jsDelivr, and the existing custom CSS remains in place so the original page structure, product cards, cart, checkout, and admin pages keep their styling and functionality.

```bash
cd frontend
npm install
npm run dev
```

Production build check:

```bash
npm run build
```

### Vercel

Import the GitHub repository in Vercel, then set **Root Directory** to `frontend` (the folder containing `package.json`). Use:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

If the Root Directory is left at the repository root, Vercel will look for `/package.json` and can show `ENOENT` because this project's frontend `package.json` is inside `frontend/`.

## Backend

The Express API lives in `backend/`.

```bash
cd backend
npm install
npm start
```

Create `backend/.env` using `backend/.env.example` and enter your own database URI, JWT secret, and payment credentials. Never commit `.env` or publish credentials.

## Notes

- The frontend's API base URL is configured in `frontend/src/api.js`; set it to your deployed backend URL before production deployment if needed.
- Bootstrap is loaded from a CDN, so clients need internet access for Bootstrap's stylesheet. Existing local CSS remains as the project's custom theme.
