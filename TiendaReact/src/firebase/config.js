// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEL5LGEE34HbgueT9QyV5z_widalxH9sI",
  authDomain: "tienda-talentotech-react.firebaseapp.com",
  projectId: "tienda-talentotech-react",
  storageBucket: "tienda-talentotech-react.firebasestorage.app",
  messagingSenderId: "95763648634",
  appId: "1:95763648634:web:0d0b999021991e4d5a6bc3",
  measurementId: "G-XXZHPCX17H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);