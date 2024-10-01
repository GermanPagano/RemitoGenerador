// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Para usar Firestore
import { getAuth } from "firebase/auth";  // Para usar Authentication

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBTsHWbV2QpsektsDrpFVbUN_hhA1CNfFY",
  authDomain: "formularia-aff5a.firebaseapp.com",
  projectId: "formularia-aff5a",
  storageBucket: "formularia-aff5a.appspot.com",
  messagingSenderId: "608090611385",
  appId: "1:608090611385:web:52cf847c97793e4b960568",
  measurementId: "G-F22T3DQH75"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore y Authentication
const db = getFirestore(app);  // Base de datos Firestore
const auth = getAuth(app);  // Autenticación Firebase

// Exportamos para usar en otros componentes
export { db, auth };
