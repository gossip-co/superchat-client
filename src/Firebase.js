// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeWna4hlUsvh4hmDQ6abfp_fRl46BpDCs",
  authDomain: "livewithcarry-6fe68.firebaseapp.com",
  projectId: "livewithcarry-6fe68",
  storageBucket: "livewithcarry-6fe68.appspot.com",
  messagingSenderId: "487054109849",
  appId: "1:487054109849:web:20323b26d0e6b7b0051c08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
