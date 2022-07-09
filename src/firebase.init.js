// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUlymBxEP42LqhssxnWtY2O2n_RJLPYLM",
  authDomain: "to-do-list-c5d75.firebaseapp.com",
  projectId: "to-do-list-c5d75",
  storageBucket: "to-do-list-c5d75.appspot.com",
  messagingSenderId: "817940910673",
  appId: "1:817940910673:web:412e5d66976559e2095e70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;