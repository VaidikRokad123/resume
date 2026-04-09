# ATS Resume Checker

## Problem Statement

Job seekers face a critical barrier in the modern hiring process: Applicant Tracking Systems (ATS) automatically reject 75% of resumes before a human ever sees them. Candidates spend hours crafting applications only to receive auto-rejections with zero feedback, leaving them unable to improve.

## Solution

An AI-powered ATS analysis tool that:
- Scans resumes against job descriptions using Gemini Pro AI
- Provides actionable ATS scores and keyword gap analysis
- Generates optimized, ATS-friendly resume rewrites in LaTeX format
- Tracks application history with score trends

## Target Users

1. **Fresh Graduates** - First-time job seekers who don't understand ATS systems
2. **Career Switchers** - Professionals pivoting industries who need to reframe their experience
3. **Senior Developers** - Experienced engineers applying to competitive roles

## Core Features

### 3 Main Screens
1. **Analysis Screen** - Upload resume + paste JD → Get AI analysis with score, keywords, suggestions
2. **Dashboard** - Track all applications, view score trends, manage resume library
3. **Auth Pages** - Login/Register with Google OAuth or email/password

## Tech Stack

- **Frontend**: React 18 + Vite, TailwindCSS, React Router v6, Recharts, Zustand
- **Backend**: Node.js 20 + Express, Mongoose, Passport.js
- **Database**: MongoDB Atlas
- **AI**: Google Gemini Pro API
- **Storage**: Cloudinary
- **Auth**: JWT + Google OAuth 2.0

## Acceptance Criteria

### Analysis Screen
- [ ] Drag-drop PDF/DOCX upload (max 10MB)
- [ ] Job description textarea (min 100 chars)
- [ ] ATS score display (0-100) with color coding
- [ ] Keyword cloud (matched/missing/partial)
- [ ] Section-by-section score breakdown
- [ ] Actionable suggestions ordered by impact
- [ ] Three output tabs: Rewritten Resume | LaTeX Source | Compare
- [ ] Download .tex file + copy to clipboard

### Dashboard
- [ ] 4 KPI cards: avg score, total apps, top score, improvement %
- [ ] Score trend area chart (last 30 days)
- [ ] Resume library with version management
- [ ] Application table with 9 columns, sortable/filterable
- [ ] Inline status updates (Applied → Screening → Interview → Offer → Rejected)
- [ ] Bulk delete with row checkboxes
- [ ] Pagination (10 per page)

### Auth
- [ ] Email/password registration with validation
- [ ] Login with JWT token
- [ ] Google OAuth one-click login
- [ ] Protected routes (redirect to /login if not authenticated)
- [ ] Token refresh on 401 errors

## Project Structure

```
ats-checker/
├── client/          # React frontend
├── server/          # Express backend
├── .env.example
└── README.md
```

## Getting Started

See individual README files in `client/` and `server/` directories.

## License

MIT
