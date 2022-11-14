import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDsvDd9omR1grkwnT--JASraNIHGImv-R0",
  authDomain: "devlinks-6af44.firebaseapp.com",
  projectId: "devlinks-6af44",
  storageBucket: "devlinks-6af44.appspot.com",
  messagingSenderId: "748164280517",
  appId: "1:748164280517:web:fcab2e4ba76498de4940ac",
  measurementId: "G-8L7BS8QNNV"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };