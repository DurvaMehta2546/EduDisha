# EduDisha Setup Guide

Complete setup guide for running EduDisha with the new Node.js backend.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project (already configured: fir-e61e9)

## Step 1: Clone and Install

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

## Step 2: Firebase Configuration

### Frontend Setup

1. Create `.env` file in the root directory:
```bash
cp .env.example .env
```

2. Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### Backend Setup

1. Get Firebase Admin SDK credentials:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select project: `fir-e61e9`
   - Go to Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Download the JSON file

2. Create `server/.env` file:
```bash
cd server
cp .env.example .env
```

3. Edit `server/.env` with your Firebase credentials:
```env
PORT=5000

FIREBASE_PROJECT_ID=fir-e61e9
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@fir-e61e9.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"

GOOGLE_CLIENT_ID=your_google_client_id_here

CLIENT_URL=http://localhost:5173
```

## Step 3: Update Frontend to Use Backend API

The frontend has been updated with new service files:
- `src/services/api.ts` - Axios instance with interceptors
- `src/services/auth.service.ts` - Authentication API calls
- `src/services/profile.service.ts` - Profile management
- `src/services/notes.service.ts` - Notes CRUD operations
- `src/services/skills.service.ts` - Skills management

The `AuthContext` has been updated to use the backend API instead of direct Firebase calls.

## Step 4: Run the Application

### Option 1: Run Both Together (Recommended)
```bash
npm run dev:all
```

This will start:
- Frontend on `http://localhost:5173`
- Backend on `http://localhost:5000`

### Option 2: Run Separately

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

## Step 5: Test the Application

1. Open `http://localhost:5173`
2. Click "Sign in with Google"
3. After authentication, you should be redirected to the dashboard
4. Test creating notes, updating profile, and managing skills

## API Endpoints

All API endpoints are available at `http://localhost:5000/api`

### Authentication
- POST `/auth/register` - Register new user
- POST `/auth/google` - Google OAuth
- POST `/auth/verify` - Verify token
- GET `/auth/me` - Get current user

### Profile
- GET `/profile` - Get profile
- PUT `/profile` - Update profile

### Notes
- POST `/notes/text` - Create text note
- POST `/notes/upload` - Upload file note
- GET `/notes` - Get all notes
- PUT `/notes/:id` - Update note
- DELETE `/notes/:id` - Delete note

### Skills
- POST `/skills` - Create/update skills
- GET `/skills/my-skills` - Get my skills
- GET `/skills/matches` - Find matches
- GET `/skills/all` - Get all skills

## Troubleshooting

### Backend won't start
- Check if Firebase credentials are correct in `server/.env`
- Ensure PORT 5000 is not in use
- Check Firebase Admin SDK JSON format

### Authentication fails
- Verify GOOGLE_CLIENT_ID matches in both frontend and backend
- Check Firebase project settings
- Ensure Firebase Authentication is enabled

### CORS errors
- Verify CLIENT_URL in `server/.env` matches your frontend URL
- Check if backend is running

### File upload fails
- Ensure Firebase Storage is enabled in Firebase Console
- Check storage bucket name in Firebase config
- Verify file size limits (10MB max)

## Migration from Direct Firebase

The app now uses:
- **Backend API** for all data operations
- **Firebase Admin SDK** on the server
- **Firebase Client SDK** only for initial Google authentication
- **JWT tokens** from Firebase for API authentication

Benefits:
- Better security (Firebase Admin SDK on server)
- Centralized business logic
- Easier to add features
- Better error handling
- API can be used by mobile apps

## Next Steps

1. Set up Firebase Firestore indexes for better performance
2. Configure Firebase Storage rules
3. Add rate limiting to API endpoints
4. Set up production environment variables
5. Deploy backend to a hosting service (Heroku, Railway, etc.)
6. Deploy frontend to Firebase Hosting or Vercel
