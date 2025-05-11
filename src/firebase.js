// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "social-acm-app.firebaseapp.com",
  projectId: "social-acm-app",
  storageBucket: "social-acm-app.firebasestorage.app",
  messagingSenderId: "858521839676",
  appId: "1:858521839676:web:71da3fcee6f951cb753b39",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);