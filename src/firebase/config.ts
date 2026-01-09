// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCJey2zqxpxiNnCFaucpVxmwrXPOqvOM7s",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fir-e61e9.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fir-e61e9",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fir-e61e9.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "344498164962",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:344498164962:web:2d224cd64c499045e13abb",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-JSF0NDXQD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
