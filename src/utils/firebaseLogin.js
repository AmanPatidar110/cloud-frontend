import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAm7ofSgc9y3CZtHt21fMXBXOLRT-ORoBI",

  authDomain: "in-house-cloud.firebaseapp.com",

  projectId: "in-house-cloud",

  storageBucket: "in-house-cloud.appspot.com",

  messagingSenderId: "852599793773",

  appId: "1:852599793773:web:1ad01b415a29392ff17764",

  measurementId: "G-P4QTKB12FR",
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
