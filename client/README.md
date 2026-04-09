# ATS Checker - Frontend

React + Vite frontend for the ATS Resume Checker application.

## Setup

1. Install dependencies:
```bash
cd client
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your Google OAuth Client ID to `.env`:
```
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

4. Start development server:
```bash
npm run dev
```

App runs on `http://localhost:5173`

## Build for Production

```bash
npm run build
```

Output in `dist/` folder.

## Features

### Authentication
- Email/password registration and login
- Google OAuth integration
- JWT token management
- Protected routes

### Analysis Screen
- Drag-and-drop resume upload (PDF/DOCX)
- Job description input
- AI-powered ATS analysis
- Score visualization with gauge
- Keyword matching (matched/missing/partial)
- Section-by-section breakdown
- Actionable suggestions
- Rewritten resume output
- LaTeX source generation

### Dashboard
- KPI cards (avg score, total apps, top score, improvement)
- Score trend chart
- Application tracker table
- Sortable/filterable columns
- Bulk operations
- Status management

## Tech Stack

- React 18
- Vite
- TailwindCSS
- React Router v6
- Recharts (data visualization)
- React Dropzone
- React Hook Form
- Axios
- Zustand (state management)
