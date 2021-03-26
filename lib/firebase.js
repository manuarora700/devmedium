import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Perfectly fine to expose public firebase keys to the front-end
const firebaseConfig = {
  apiKey: "AIzaSyByt62FYwaMJoaZORJrA8z39k3cD8G8xwA",
  authDomain: "devmedium-8492f.firebaseapp.com",
  projectId: "devmedium-8492f",
  storageBucket: "devmedium-8492f.appspot.com",
  messagingSenderId: "656756526690",
  appId: "1:656756526690:web:0eef740346c7fbfa748b3b",
  measurementId: "G-KL5B7DTZ4Z",
};

// Next in deveopment can call this method twice -> Firebase must be initialized only once. Therefore, the below syntax
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

// Helper functions

/**
 * Gets a users/{uid} document with username
 * @param {string} username
 */

export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  try {
    const data = doc.data();
    return {
      ...data,
      createdAt: data?.createdAt.toMillis() || 0,
      updatedAt: data?.updatedAt.toMillis() || 0,
    };
  } catch (err) {
    console.log(err);
  }
}
