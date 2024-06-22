// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database'; // Add this line
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuVbeqyMIbXk0PheZd4_zGbFY1oRb-1gw",
  authDomain: "h2oprepay.firebaseapp.com",
  databaseURL: "https://h2oprepay-default-rtdb.firebaseio.com/", // Add this line
  projectId: "h2oprepay",
  storageBucket: "h2oprepay.appspot.com",
  messagingSenderId: "213836303220",
  appId: "1:213836303220:web:b7eddf3515b906527e3a21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const database = getDatabase(app); // Add this line

export { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword, database };