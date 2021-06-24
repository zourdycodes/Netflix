import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// 1) when seeding the database you'll have to uncomment this!
// import { seedDatabase } from "../seeds";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvrU7AL8ZqSoXFNBOHCE5mhfnQw8RKRBc",
  authDomain: "netflix-7cf9a.firebaseapp.com",
  projectId: "netflix-7cf9a",
  storageBucket: "netflix-7cf9a.appspot.com",
  messagingSenderId: "985211913732",
  appId: "1:985211913732:web:65b7c4b8880fdafed0d751",
  measurementId: "G-712FSV7KWR",
};

// !firebase.apps.length
//   : firebase.app();

const firebase = Firebase.initializeApp(firebaseConfig);
// 2) when seeding the database you'll have to uncomment this!
// seedDatabase(firebase);
// 3) once you have populated the database (only run once!), re-comment this so you don't get duplicate data

export { firebase };
