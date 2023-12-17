// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "project-auth-d1928.firebaseapp.com",
  projectId: "project-auth-d1928",
  storageBucket: "project-auth-d1928.appspot.com",
  messagingSenderId: "1010258082375",
  appId: "1:1010258082375:web:ad31a564ad76278d6c0f62"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);