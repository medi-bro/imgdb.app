// This just adds in a central way to access firebase API
// Each component should share access to these objects, but not every page will need it,
// so it may be worth it to add singleton pattern or dependency injection later.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyAvxLOZm5No5k1dsnYfziTdv0KxKqf90kU",
    authDomain: "medical-direct-5a084.firebaseapp.com",
    projectId: "medical-direct-5a084",
    storageBucket: "medical-direct-5a084.appspot.com",
    messagingSenderId: "1043402947787",
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const cloud = getStorage(app);
