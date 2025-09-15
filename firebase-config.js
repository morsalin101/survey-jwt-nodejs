// Firebase Configuration
// Use this configuration in your client-side applications

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAENKuneW_ddwnVTtcu1IaXldRf9HyCk48",
  authDomain: "nglapp-e7eaa.firebaseapp.com",
  projectId: "nglapp-e7eaa",
  storageBucket: "nglapp-e7eaa.firebasestorage.app",
  messagingSenderId: "941039783076",
  appId: "1:941039783076:web:6f507be0748edf988e2a31",
  measurementId: "G-6F53RB76BB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth, firebaseConfig };