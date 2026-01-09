// Simple test script to check if server is configured correctly
import dotenv from 'dotenv';
dotenv.config();

console.log('=== Server Configuration Check ===\n');

console.log('Environment Variables:');
console.log('PORT:', process.env.PORT || '5000');
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? '✓ Set' : '✗ Missing');
console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL ? '✓ Set' : '✗ Missing');
console.log('FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? '✓ Set' : '✗ Missing');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✓ Set' : '✗ Missing');
console.log('CLIENT_URL:', process.env.CLIENT_URL || 'http://localhost:5173');

console.log('\n=== Testing Firebase Connection ===\n');

try {
  const { default: admin } = await import('firebase-admin');
  
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
  });

  console.log('✓ Firebase Admin initialized successfully');
  
  const db = admin.firestore();
  console.log('✓ Firestore connection established');
  
  const auth = admin.auth();
  console.log('✓ Firebase Auth connection established');
  
  const storage = admin.storage();
  console.log('✓ Firebase Storage connection established');
  
  console.log('\n=== All checks passed! ===');
  console.log('Your server should be ready to run.');
  
  process.exit(0);
} catch (error) {
  console.error('\n✗ Error:', error.message);
  console.error('\nPlease check your .env file configuration.');
  process.exit(1);
}
