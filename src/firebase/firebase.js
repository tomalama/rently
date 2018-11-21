import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyCxO548dawso9PDzlIMXI5A900DnkOsXXw",
  authDomain: "rently-8a83b.firebaseapp.com",
  databaseURL: "https://rently-8a83b.firebaseio.com",
  projectId: "rently-8a83b",
  storageBucket: "rently-8a83b.appspot.com",
  messagingSenderId: "342943849439"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
