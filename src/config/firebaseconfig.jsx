// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIERMjPc0HYdccftZMbF5S-fAQYDNieBM",
  authDomain: "ai-trip-cf674.firebaseapp.com",
  projectId: "ai-trip-cf674",
  storageBucket: "ai-trip-cf674.firebasestorage.app",
  messagingSenderId: "728094002814",
  appId: "1:728094002814:web:e36eb54b50601b8a4d522f",
  measurementId: "G-5FNCWKRVMW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);