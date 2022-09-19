import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMyiotDw47oH_LAOTgM_oMZ6aYMV8Rkq0",
  authDomain: "makesomegood-73a4d.firebaseapp.com",
  projectId: "makesomegood-73a4d",
  storageBucket: "makesomegood-73a4d.appspot.com",
  messagingSenderId: "644111052002",
  appId: "1:644111052002:web:1e03d502009be37eeb02bb",
  measurementId: "G-PFJ6C6L743"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const auth = app.auth(); 
export const auth = getAuth(app);

export const storage = getStorage(app);
