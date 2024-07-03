// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiu0Xs_NTNNgrR0LCjR7nefFc8aDNNSMw",
  authDomain: "final-judgment-prediction.firebaseapp.com",
  databaseURL: "https://final-judgment-prediction-default-rtdb.firebaseio.com",
  projectId: "final-judgment-prediction",
  storageBucket: "final-judgment-prediction.appspot.com",
  messagingSenderId: "750356639618",
  appId: "1:750356639618:web:bc1e7d869ee83c455aa99b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const rtDatabase = getDatabase(app);
export const storage = getStorage(app);

export default app;
