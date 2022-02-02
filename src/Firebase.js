import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZLNXN4yjvNlLL-p9RAMSvZnnWZdxrKe0",
  authDomain: "task-84a66.firebaseapp.com",
  projectId: "task-84a66",
  storageBucket: "task-84a66.appspot.com",
  messagingSenderId: "1029569854560",
  appId: "1:1029569854560:web:432885bcb4991d48735705",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
