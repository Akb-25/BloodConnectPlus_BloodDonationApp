// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz2VGtuTJUulaqK4XIZMLiq6JHuNN_FSg",
  authDomain: "bloodconnectplus.firebaseapp.com",
  projectId: "bloodconnectplus",
  storageBucket: "bloodconnectplus.firebasestorage.app",
  messagingSenderId: "553409427151",
  appId: "1:553409427151:web:5c6531c079e44f48a2a9ba",
  measurementId: "G-ZVYW0B92MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const auth = getAuth(app);

// const analytics = getAnalytics(app);

export { auth, db, storage };