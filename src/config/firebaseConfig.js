
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD797umRY9y5jAN8d_y_E1T_hCcADDcBeg",
  authDomain: "to-do-master-e49da.firebaseapp.com",
  projectId: "to-do-master-e49da",
  storageBucket: "to-do-master-e49da.firebasestorage.app",
  messagingSenderId: "130841487348",
  appId: "1:130841487348:web:afdc7590fb0e05bfeb3ba1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);