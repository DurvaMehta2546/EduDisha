# Firebase Setup Required

## Issue
Cloud Firestore API is not enabled in your Firebase project.

## Fix Steps

### 1. Enable Firestore
Click this link to enable Firestore API:
**https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=fir-e61e9**

Or manually:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **fir-e61e9**
3. Click on "Firestore Database" in the left menu
4. Click "Create Database"
5. Choose "Start in production mode" or "Test mode"
6. Select a location (e.g., us-central)
7. Click "Enable"

### 2. Enable Firebase Storage (for file uploads)
1. In Firebase Console, go to "Storage"
2. Click "Get Started"
3. Choose security rules (start in test mode for development)
4. Click "Done"

### 3. Enable Firebase Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get Started"
3. Enable "Email/Password" sign-in method
4. Enable "Google" sign-in method
5. Add your domain to authorized domains if needed

### 4. Wait a few minutes
After enabling these services, wait 2-3 minutes for the changes to propagate.

### 5. Test Again
After enabling Firestore, try registering again in your app.

## Quick Enable Links

- **Firestore**: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=fir-e61e9
- **Firebase Console**: https://console.firebase.google.com/project/fir-e61e9

## Alternative: Use Firebase Client SDK Directly

If you want to avoid backend setup complexity, you can continue using Firebase directly from the frontend (your original setup). The backend is optional for this project.
