import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb_mT2kfh6xePdUH6cOCylzl5S_Nf1G4I",
  authDomain: "whatsapp-clone-b032d.firebaseapp.com",
  projectId: "whatsapp-clone-b032d",
  storageBucket: "whatsapp-clone-b032d.appspot.com",
  messagingSenderId: "126906147283",
  appId: "1:126906147283:web:787b25d16d6570ebd18f26",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
