import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyCxO548dawso9PDzlIMXI5A900DnkOsXXw",
  authDomain: "rently-8a83b.firebaseapp.com",
  databaseURL: "https://rently-8a83b.firebaseio.com",
  projectId: "rently-8a83b",
  storageBucket: "rently-8a83b.appspot.com",
  messagingSenderId: "342943849439"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
