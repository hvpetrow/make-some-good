import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics} from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBMyiotDw47oH_LAOTgM_oMZ6aYMV8Rkq0",
  authDomain: "makesomegood-73a4d.firebaseapp.com",
  projectId: "makesomegood-73a4d",
  storageBucket: "makesomegood-73a4d.appspot.com",
  messagingSenderId: "644111052002",
  appId: "1:644111052002:web:1e03d502009be37eeb02bb",
  measurementId: "G-PFJ6C6L743"
};

// async function getCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
//   }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);