// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProveider} from "firebase/auth";

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
const db=getDatabase(app)
const auth=getAuth(app)
const provider=new GoogleAuthProveider();

export {db,auth,provider}


// in firebase Login-> console ->Build ->Realtime Database -> Rules
/*{
  "rules": {
    "messages": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$uid": {
        ".validate": "auth.uid == $uid"
      }
    }
  }
}  these rule to ensure only authenticated users can read and write messages*/