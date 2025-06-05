import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBs9d-ebpNOxZyRqkwYnS9yzJ6H09L9Js",
  authDomain: "koll-d899d.firebaseapp.com",
  projectId: "koll-d899d",
  storageBucket: "koll-d899d.firebasestorage.app",
  messagingSenderId: "959026262448",
  appId: "1:959026262448:web:26af7689863fb5bd622675",
  measurementId: "G-7TP0RLM104",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
