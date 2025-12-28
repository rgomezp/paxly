import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let isInitialized = false;

export function ensureFirebaseInitialized() {
  // make sure GOOGLE_APPLICATION_CREDENTIALS is set
  if (process.env.NODE_ENV === 'development' && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error('GOOGLE_APPLICATION_CREDENTIALS is not set in development mode');
  }

  if (!isInitialized) {
    try {
      initializeApp({
        credential: applicationDefault(),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
      });
    } catch (error) {
      // Ignore error if app is already initialized
      if (!(error instanceof Error && error.message.includes('already exists'))) {
        throw error;
      }
    }
    isInitialized = true;
  }
  return getFirestore();
}

// Initialize Firebase and get Firestore instance
export const firestore = ensureFirebaseInitialized();
