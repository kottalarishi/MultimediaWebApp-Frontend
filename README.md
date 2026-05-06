# MultimediaWebApp — Frontend

React + Vite frontend for the MultimediaWebApp platform. Provides user authentication, file uploads, AI-generated summaries, and a chat interface for interacting with uploaded documents.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React | UI framework |
| Vite | Build tool & dev server |
| React Router | Client-side routing |
| Axios | HTTP client |
| CSS | Styling |

---

## Features

- User registration and login with JWT authentication
- File upload interface (PDFs, Audio, Video & Multimedia)
- AI-generated document summaries
- Chat interface for uploaded files
- Dashboard for managing documents
- Protected routes with automatic auth headers

---



## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Page-level views
├── service/          # API service layer (Axios)
└── styles/           # Global and component styles

public/               # Static assets
```

---

## Prerequisites

- [Node.js](https://nodejs.org/)
- npm

---

## Getting Started

### 1. Clone the repository

```bash
git clone <frontend-repository-url>
cd multimedia-web-app-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API base URL

Open `src/service/ApiService.js` and set your backend URL:

```js
static BASE_URL = "https://your-backend-url.onrender.com";
```

### 4. Start the development server

```bash
npm run dev
```

App runs at: `http://localhost:5173`

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |

---

## Authentication

- JWT token is stored in `localStorage` after successful login
- Protected API requests automatically include the `Authorization` header via Axios interceptors

---

## Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel / Netlify |
| Backend | Docker (Render or similar) |
| Database | PostgreSQL |

For Vercel deployment, set the `BASE_URL` environment variable or update `ApiService.js` before building.

---

## Notes

- All API communication goes through `src/service/ApiService.js`
- Backend routes require authentication — unauthenticated requests will be rejected
- Environment-based API configuration is supported
