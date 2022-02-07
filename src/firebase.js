import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB4jrS4rqI2Yq3U_JOYfPz3pwZBrVfAOUM",
    authDomain: "test-1-38325.firebaseapp.com",
    projectId: "test-1-38325",
    storageBucket: "test-1-38325.appspot.com",
    messagingSenderId: "649011293718",
    appId: "1:649011293718:web:603fd3346956eeceb94f37",
    measurementId: "G-ZZYN86BNWW"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
// connectFirestoreEmulator(db, 'localhost', 8080);
export const storage = getStorage(firebaseApp);

export default firebaseConfig;