// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { configs } from '../config';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: configs.apiKey,
  authDomain: configs.authDomain,
  projectId: configs.projectId,
  storageBucket: configs.storageBucket,
  messagingSenderId: configs.messagingSenderId,
  appId: configs.appId,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
