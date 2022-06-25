import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAy4KyCyGdkjxnAIVGWpgXtz09kkvg1NF4",
  authDomain: "fir-e2956.firebaseapp.com",
  projectId: "fir-e2956",
  storageBucket: "fir-e2956.appspot.com",
  messagingSenderId: "4572429365",
  appId: "1:4572429365:web:aa0591de9efa32b67cc57c"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);