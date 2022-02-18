import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    Config
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
// connectFirestoreEmulator(db, 'localhost', 8080);
export const storage = getStorage(firebaseApp);

export default firebaseConfig;
