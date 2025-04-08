import admin from "firebase-admin"
import serviceAccount from "../firebase-admin.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "bloodconnectplus.firebasestorage.app"
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { db, bucket };