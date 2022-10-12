// This just adds in a central way to access firebase API
// Each component should share access to these objects, but not every page will need it,
// so it may be worth it to add singleton pattern or dependency injection later.

import { firebaseConfig } from "./firebase-config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)