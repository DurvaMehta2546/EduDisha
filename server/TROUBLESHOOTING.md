# Troubleshooting Guide

## Quick Diagnostics

### 1. Test Server Configuration
```bash
cd server
npm run test
```

This will check if all environment variables are set correctly and Firebase is properly configured.

## Common Issues

### Registration Fails with "Registration failed. Please try again."

**Possible Causes:**

1. **Server not running**
   - Check if the server is running on port 5000
   - Run: `cd server && npm run dev`
   - Look for: `🚀 Server running on port 5000`

2. **Firebase credentials not configured**
   - Check `server/.env` file exists
   - Verify all Firebase variables are set:
     - `FIREBASE_PROJECT_ID`
     - `FIREBASE_CLIENT_EMAIL`
     - `FIREBASE_PRIVATE_KEY`
   - Run: `cd server && npm run test` to verify

3. **CORS issues**
   - Check browser console for CORS errors
   - Verify `CLIENT_URL` in `server/.env` matches your frontend URL
   - Default: `http://localhost:5173`

4. **Firebase Admin SDK errors**
   - Check server console for detailed error messages
   - Common errors:
     - `auth/invalid-email`: Email format is invalid
     - `auth/email-already-exists`: User already registered
     - `auth/weak-password`: Password must be at least 6 characters

### How to Check Server Logs

1. Open terminal where server is running
2. Look for error messages after clicking "Create Account"
3. Errors will show:
   - Validation errors
   - Firebase errors with codes
   - Stack traces

### Frontend Console Errors

Open browser DevTools (F12) and check:
1. **Console tab**: Look for error messages
2. **Network tab**: Check if `/api/auth/register` request:
   - Returns 500/400 error
   - Shows error response body
   - Times out (server not running)

## Step-by-Step Fix

### If server is not running:
```bash
cd server
npm install
npm run dev
```

### If Firebase not configured:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `fir-e61e9`
3. Go to Project Settings > Service Accounts
4. Click "Generate New Private Key"
5. Download JSON file
6. Copy values to `server/.env`:
```env
FIREBASE_PROJECT_ID=fir-e61e9
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@fir-e61e9.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Key_Here\n-----END PRIVATE KEY-----\n"
```

### If API URL is wrong:
1. Check `.env` in root directory:
```env
VITE_API_URL=http://localhost:5000/api
```
2. Restart frontend: `npm run dev`

## Testing Registration

### Test with curl:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123456",
    "role": "student",
    "university": "Gujarat Technological University",
    "semester": "Semester 1",
    "branch": "Computer Engineering"
  }'
```

Expected response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "abc123",
    "email": "test@example.com",
    "name": "Test User",
    "role": "student",
    ...
  }
}
```

## Still Having Issues?

1. Check both server and frontend are running
2. Verify `.env` files in both root and `server/` directories
3. Check browser console and server logs for specific errors
4. Try registering with a different email
5. Ensure password is at least 6 characters
6. Check Firebase project is active and billing is enabled (if required)
