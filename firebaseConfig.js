// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export const firebaseConfig = {
  apiKey: "AIzaSyA52cRIyEFyqy6eQ0XLHkiF9XsocMSOZVE",
  authDomain: "verifyemailstd.firebaseapp.com",
  projectId: "verifyemailstd",
  storageBucket: "verifyemailstd.firebasestorage.app",
  messagingSenderId: "362238369897",
  appId: "1:362238369897:web:90eca635dace62e72d82f8",
  measurementId: "G-07H7JT2W0N"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
