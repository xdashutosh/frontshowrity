// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAh7H4GiI-i96WVVZ3yWZpHxVkE2NWSt8",
  authDomain: "hustleforwork-310c3.firebaseapp.com",
  projectId: "hustleforwork-310c3",
  storageBucket: "hustleforwork-310c3.appspot.com",
  messagingSenderId: "88023070242",
  appId: "1:88023070242:web:9425b0837c30c73a2efc7b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

export { auth, provider, fbProvider };
