# ATS Checker - Backend

Express.js backend for the ATS Resume Checker application.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Create `.env` file (copy from `.env.example` in root):
```bash
cp ../.env.example .env
```

3. Configure environment variables in `.env`:
   - MongoDB Atlas connection string
   - JWT secret key
   - Google Gemini API key
   - Google OAuth credentials
   - Cloudinary credentials

4. Start development server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `GET /api/auth/me` - Get current user

### Upload
- `POST /api/upload` - Upload resume (PDF/DOCX)
- `GET /api/upload` - Get user's resumes
- `GET /api/upload/:id` - Get specific resume

### Analysis
- `POST /api/analysis` - Create new analysis
- `GET /api/analysis` - Get user's analyses
- `GET /api/analysis/:id` - Get specific analysis
- `DELETE /api/analysis/:id` - Delete analysis

### Applications
- `POST /api/applications` - Create application
- `GET /api/applications` - Get user's applications
- `GET /api/applications/stats` - Get statistics
- `GET /api/applications/:id` - Get specific application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application
- `POST /api/applications/bulk-delete` - Bulk delete

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Google Gemini Pro AI
- Cloudinary (file storage)
- Passport.js (OAuth)
