import { validationResult } from 'express-validator';
import { OAuth2Client } from 'google-auth-library';
import { auth, db } from '../config/firebase.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array(), message: 'Validation failed' });
    }

    const { email, password, name, role, university, semester, branch } = req.body;

    console.log('Registration attempt:', { email, name, role, university, semester, branch });

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name
    });

    console.log('Firebase user created:', userRecord.uid);

    // Create user profile in Firestore
    const profileData = {
      email,
      name,
      role: role || 'student',
      university: university || 'Gujarat Technological University',
      semester: semester || 'Semester 1',
      branch: branch || 'Not specified',
      verified: false,
      createdAt: new Date().toISOString()
    };

    await db.collection('profiles').doc(userRecord.uid).set(profileData);

    console.log('Profile created in Firestore');

    // Generate custom token
    const token = await auth.createCustomToken(userRecord.uid);

    console.log('Custom token generated');

    res.status(201).json({
      success: true,
      token,
      user: {
        id: userRecord.uid,
        ...profileData
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ message: 'User already exists' });
    }
    if (error.code === 'auth/invalid-email') {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    if (error.code === 'auth/weak-password') {
      return res.status(400).json({ message: 'Password is too weak' });
    }
    
    res.status(500).json({ 
      message: 'Server error during registration',
      error: error.message,
      code: error.code
    });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Note: Firebase Admin SDK doesn't support password verification
    // This endpoint is mainly for compatibility - clients should use Firebase Client SDK
    res.status(400).json({ 
      message: 'Please use Firebase client SDK for email/password login or use Google Sign-In' 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { token: googleToken } = req.body;

    if (!googleToken) {
      return res.status(400).json({ message: 'Google token is required' });
    }

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user exists in Firebase Auth
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // Create new user
        userRecord = await auth.createUser({
          email,
          displayName: name,
          photoURL: picture,
          emailVerified: true
        });
      } else {
        throw error;
      }
    }

    // Get or create profile
    const profileRef = db.collection('profiles').doc(userRecord.uid);
    const profileDoc = await profileRef.get();

    let profileData;
    if (!profileDoc.exists) {
      profileData = {
        email,
        name,
        avatar: picture,
        role: 'student',
        university: 'Gujarat Technological University',
        semester: 'Semester 1',
        branch: 'Not specified',
        verified: true,
        createdAt: new Date().toISOString()
      };
      await profileRef.set(profileData);
    } else {
      profileData = profileDoc.data();
      // Update avatar if changed
      if (picture && picture !== profileData.avatar) {
        await profileRef.update({ avatar: picture });
        profileData.avatar = picture;
      }
    }

    // Generate custom token
    const token = await auth.createCustomToken(userRecord.uid);

    res.json({
      success: true,
      token,
      user: {
        id: userRecord.uid,
        ...profileData
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Google authentication failed' });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    // Verify the Firebase ID token
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Get user profile
    const profileDoc = await db.collection('profiles').doc(uid).get();
    
    if (!profileDoc.exists) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    const profileData = profileDoc.data();

    res.json({
      success: true,
      user: {
        id: uid,
        ...profileData
      }
    });
  } catch (error) {
    console.error('Verify token error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const getMe = async (req, res) => {
  try {
    const profileDoc = await db.collection('profiles').doc(req.user.uid).get();
    
    if (!profileDoc.exists) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    const profileData = profileDoc.data();

    res.json({
      success: true,
      user: {
        id: req.user.uid,
        ...profileData
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
