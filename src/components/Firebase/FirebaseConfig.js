// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBs-Xkqd26dJKHSlLmTniqQS8MXkR_Mey0",
  authDomain: "foodapp-523ac.firebaseapp.com",
  projectId: "foodapp-523ac",
  storageBucket: "foodapp-523ac.appspot.com",
  messagingSenderId: "337002462448",
  appId: "1:337002462448:web:0c096b4ffef832bb841635"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
const storage=getStorage(app);
export {db,storage};