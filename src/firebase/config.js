// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFireStore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyARjgDpdiBViYOZqGdti2Ktw5lHNsGP0UA',
  authDomain: 'fotoblogg-da3d5.firebaseapp.com',
  projectId: 'fotoblogg-da3d5',
  storageBucket: 'fotoblogg-da3d5.appspot.com',
  messagingSenderId: '1039330108278',
  appId: '1:1039330108278:web:e5517c410042eccd475057',
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(FireBaseApp);
export const FireBaseDB = getFireStore(FireBaseApp);
