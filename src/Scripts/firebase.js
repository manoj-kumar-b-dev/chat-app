// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getDatabase(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export {db,auth,provider}


// in firebase Login-> console ->Build ->Realtime Database -> Rules
/*{
  "rules": {
    "messages": {
      ".read": "auth != null",
      ".write": "auth != null",
      "": {
        ".validate": "auth.uid == "
      }
    }
  }
}  these rule to ensure only authenticated users can read and write messages*/
