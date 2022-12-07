// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnoS3nRiiq-Jp6l0NQD1k2idqCcY1v4yw",
  authDomain: "todolist-349df.firebaseapp.com",
  projectId: "todolist-349df",
  storageBucket: "todolist-349df.appspot.com",
  messagingSenderId: "943902038387",
  appId: "1:943902038387:web:753551407fe715579a0d06",
  measurementId: "G-S6WNEWN20D"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();