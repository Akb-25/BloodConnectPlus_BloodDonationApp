import admin from "firebase-admin"
import serviceAccount from "../firebase-admin.json";

import dotenv from 'dotenv';
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { db, bucket };