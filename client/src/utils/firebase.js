import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "aceinterview-ff09e.firebaseapp.com",
  projectId: "aceinterview-ff09e",
  storageBucket: "aceinterview-ff09e.firebasestorage.app",
  messagingSenderId: "495330280854",
  appId: "1:495330280854:web:962f4f95d2315a810b89b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()
export {auth,provider}