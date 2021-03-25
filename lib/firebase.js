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
export const firestore = firebase.firestore();
export const storage = firebase.storage();
