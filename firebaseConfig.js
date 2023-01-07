import { DefaultTheme } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBh2donaty98LG550TmrRpQXJm-XmtvIsc",
  authDomain: "pokedex-firebase-b99e2.firebaseapp.com",
  projectId: "pokedex-firebase-b99e2",
  storageBucket: "pokedex-firebase-b99e2.appspot.com",
  messagingSenderId: "8939602846",
  appId: "1:8939602846:web:448081bf3749d2e7824c8f",
};

const app = initializeApp(firebaseConfig);
export default app;
