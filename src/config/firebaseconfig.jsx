import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCy4cqc_UaK8jpKaXEDThvYytAymcYCV60",
  authDomain: "aitipp.firebaseapp.com",
  projectId: "aitipp",
  storageBucket: "aitipp.firebasestorage.app",
  messagingSenderId: "93334355013",
  appId: "1:93334355013:web:882078e4392863e419b72c",
  measurementId: "G-J3E8SCFC8E"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
