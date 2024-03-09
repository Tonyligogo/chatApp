import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";


const firebaseConfig = {

  apiKey: "AIzaSyDz-IicKsAy1va8l3otGedfQK57rJTMrn8",

  authDomain: "chat-4514d.firebaseapp.com",

  projectId: "chat-4514d",

  storageBucket: "chat-4514d.appspot.com",

  messagingSenderId: "87328563954",

  appId: "1:87328563954:web:5b11c4af341909a17ae66b"

};


// Initialize Firebase

 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth();
 export const storage = getStorage();
 export const db = getFirestore();