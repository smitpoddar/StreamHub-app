// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgTJnqGmJ5rnzJfYBnJctbBl-pfIDJyfk",
  authDomain: "netflix-clone-e4110.firebaseapp.com",
  projectId: "netflix-clone-e4110",
  storageBucket: "netflix-clone-e4110.firebasestorage.app",
  messagingSenderId: "370431989811",
  appId: "1:370431989811:web:a14a05c275451495ddab46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
