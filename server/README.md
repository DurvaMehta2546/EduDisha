# EduDisha Backend Server

Node.js + Express + Firebase backend for the EduDisha platform.

## Setup

### 1. Install dependencies:
```bash
cd server
npm install
```

### 2. Firebase Setup

#### Get Firebase Admin SDK Credentials:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `fir-e61e9`
3. Go to Project Settings > Service Accounts
4. Click "Generate New Private Key"
5. Download the JSON file

#### Configure Environment Variables:
Create `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Firebase credentials:
```env
PORT=5000

# Firebase Admin SDK (from downloaded JSON file)
FIREBASE_PROJECT_ID=fir-e61e9
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@fir-e61e9.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"

# Google OAuth (same as frontend)
GOOGLE_CLIENT_ID=your_google_client_id_here

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### 3. Run the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register with email/password
- `POST /api/auth/login` - Login (redirects to Firebase client SDK)
- `POST /api/auth/google` - Google OAuth authentication
- `POST /api/auth/verify` - Verify Firebase ID token
- `GET /api/auth/me` - Get current user (protected)

### Profile
- `GET /api/profile` - Get user profile (protected)
- `PUT /api/profile` - Update user profile (protected)

### Notes
- `POST /api/notes/text` - Create text note (protected)
- `POST /api/notes/upload` - Upload file note (protected)
- `GET /api/notes` - Get all user notes (protected)
- `GET /api/notes?subject=Math` - Filter notes by subject (protected)
- `PUT /api/notes/:noteId` - Update text note (protected)
- `DELETE /api/notes/:noteId` - Delete note (protected)

### Skills
- `POST /api/skills` - Create/update skills (protected)
- `GET /api/skills/my-skills` - Get user's skills (protected)
- `GET /api/skills/matches` - Find skill matches (protected)
- `GET /api/skills/all` - Get all skills (protected)

## Firebase Collections Structure

### profiles
```
profiles/{userId}
  - email: string
  - name: string
  - avatar: string
  - role: 'student' | 'admin'
  - university: string
  - semester: string
  - branch: string
  - verified: boolean
  - createdAt: timestamp
```

### users/{userId}/notes
```
users/{userId}/notes/{noteId}
  - title: string
  - subject: string
  - content: string (for text notes)
  - type: 'text' | 'file'
  - fileURL: string (for file notes)
  - fileName: string
  - filePath: string
  - size: number
  - tags: array
  - createdDate: timestamp
  - lastModified: timestamp
```

### skills
```
skills/{userId}
  - userId: string
  - canTeach: array of { skill, proficiency, description }
  - wantToLearn: array of { skill, priority, reason }
  - availability: { days: array, timeSlots: array }
  - verified: boolean
  - createdAt: timestamp
  - updatedAt: timestamp
```

## Features

- Firebase Authentication integration
- Firebase Firestore for database
- Firebase Storage for file uploads
- Google OAuth support
- Protected routes with Firebase ID token verification
- Skill matching algorithm
- Error handling
- Input validation

## Tech Stack

- Node.js + Express
- Firebase Admin SDK
- Firebase Firestore
- Firebase Storage
- Firebase Authentication
- Google Auth Library
- Multer for file uploads
