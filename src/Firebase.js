import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyDqwpm6kW8ly-BuWldEg_5n9_IwjMQrGHA",
  authDomain: "netflix-clone-b6078.firebaseapp.com",
  projectId: "netflix-clone-b6078",
  storageBucket: "netflix-clone-b6078.appspot.com",
  messagingSenderId: "598429691675",
  appId: "1:598429691675:web:38872b168edd1f2aedadbe",
  measurementId: "G-NXYCE16XXP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code);
  }
};
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code);
  }
};
const logout = () => {
  signOut(auth);
};
export { auth, db, login, logout, signup };
