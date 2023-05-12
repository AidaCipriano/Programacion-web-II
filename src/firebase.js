// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAJ-OvjRqRebxB-cVPC2VB6nCg67gtCQ1A",
  authDomain: "poi-project-f5352.firebaseapp.com",
  databaseURL: "https://poi-project-f5352-default-rtdb.firebaseio.com",
  projectId: "poi-project-f5352",
  storageBucket: "poi-project-f5352.appspot.com",
  messagingSenderId: "580799136155",
  appId: "1:580799136155:web:6a8af2ddc6f97fa1b2213e",
  measurementId: "G-PSJHE7LGH1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore();