import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDlX952laEdDOkcdSBhx2wp4pLDkvIBBO0",
  authDomain: "conversation-room.firebaseapp.com",
  projectId: "conversation-room",
  storageBucket: "conversation-room.appspot.com",
  messagingSenderId: "562312713759",
  appId: "1:562312713759:web:849ee6797032103e58e72a",
  measurementId: "G-71E7M6833V"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);