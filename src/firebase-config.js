import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDHFiT66CsgPsM9yMxQD1yXI64MR1ZD8Ak",
  authDomain: "to-do-cde16.firebaseapp.com",
  projectId: "to-do-cde16",
  storageBucket: "to-do-cde16.appspot.com",
  messagingSenderId: "1059515047836",
  appId: "1:1059515047836:web:9a54f401a7c4c0eb4ef259"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
