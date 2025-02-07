import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyD9Apft85A5xCM3_E9c_5cHsKztq4LiBO0",
    authDomain: "pointchat-f74bf.firebaseapp.com",
    databaseURL: "https://pointchat-f74bf-default-rtdb.firebaseio.com",
    projectId: "pointchat-f74bf",
    storageBucket: "pointchat-f74bf.firebasestorage.app",
    messagingSenderId: "996163495622",
    appId: "1:996163495622:web:adc83c798d6e95e35019c7",
    measurementId: "G-QC4C7J6CBM",
    databaseURL: "https://pointchat-f74bf-default-rtdb.firebaseio.com/"
  };
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();