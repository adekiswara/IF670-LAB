// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA8s4DecINriy0dOS0vM7eUvkcmX0qGYlY",
    authDomain: "ionic-firebase-42166.firebaseapp.com",
    projectId: "ionic-firebase-42166",
    storageBucket: "ionic-firebase-42166.appspot.com",
    messagingSenderId: "864273309865",
    appId: "1:864273309865:web:d37def43db8012962d09b8"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);