import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDMK6Uy9tZ3r4kx32CByxP47qqk45cuTuI",
  authDomain: "fir-tar.firebaseapp.com",
  projectId: "fir-tar",
  storageBucket: "fir-tar.appspot.com",
  messagingSenderId: "732971743780",
  appId: "1:732971743780:web:8a5dccd04866fe140df6b1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
