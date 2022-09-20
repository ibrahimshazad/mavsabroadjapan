// Code for the firebase domain

//import functions from the firebase
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getFirestore, collection, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "INSERT HERE",
  authDomain: "INSERT HERE",
  projectId: "INSERT HERE",
  storageBucket: "INSERT HERE",
  messagingSenderId: "INSERT HERE",
  appId: "INSERT HERE",
  measurementId: "INSERT HERE"
};

// Initialize Firebase functions
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
const database = getDatabase();
//export variables to other js files
export {
  auth,
  db,
  storage,
  database
};
