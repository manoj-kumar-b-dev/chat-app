// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4LIYMbrVn29b4xWG1dlDrAsUseCtQlYY",
  authDomain: "chat-app-d1d5a.firebaseapp.com",
  databaseURL: "https://chat-app-d1d5a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app-d1d5a",
  storageBucket: "chat-app-d1d5a.firebasestorage.app",
  messagingSenderId: "339768460902",
  appId: "1:339768460902:web:9b1946c2f65a7bb8bc4fa7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
export default db