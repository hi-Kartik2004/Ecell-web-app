import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqUY21LSmXeKcfMKM0ihuC08P7Bpu8Jec",
  authDomain: "ecell-web.firebaseapp.com",
  projectId: "ecell-web",
  storageBucket: "ecell-web.appspot.com",
  messagingSenderId: "194696355399",
  appId: "1:194696355399:web:c2ea26675552f178b25b62",
  measurementId: "G-73F08VC2QG",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
