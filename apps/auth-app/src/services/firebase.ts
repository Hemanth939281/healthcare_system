// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-J0iIFaLCRs06UWbb_uc8YUqgZRHQs4g",
  authDomain: "healthcare-83d7f.firebaseapp.com",
  projectId: "healthcare-83d7f",
  storageBucket: "healthcare-83d7f.firebasestorage.app",
  messagingSenderId: "232225858444",
  appId: "1:232225858444:web:d148b6bc31bde4085d2ca9",
  measurementId: "G-ESTLBGCNH5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);