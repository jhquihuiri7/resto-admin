// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvd3T20tsHkhi8R1to6DeRexUHucJxkds",
  authDomain: "resto-admin-backend-d3252.firebaseapp.com",
  projectId: "resto-admin-backend-d3252",
  storageBucket: "resto-admin-backend-d3252.firebasestorage.app",
  messagingSenderId: "116666489240",
  appId: "1:116666489240:web:deda871a7fef73dd8df3ed",
  measurementId: "G-EZMZJNMLND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { app, db };