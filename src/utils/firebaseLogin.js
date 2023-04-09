import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth, 
  signOut,
} from "firebase/auth";
import { useDispatch } from "react-redux";

const firebaseConfig = {
  apiKey: "AIzaSyAm7ofSgc9y3CZtHt21fMXBXOLRT-ORoBI",

  authDomain: "in-house-cloud.firebaseapp.com",

  projectId: "in-house-cloud",

  storageBucket: "in-house-cloud.appspot.com",

  messagingSenderId: "852599793773",

  appId: "1:852599793773:web:1ad01b415a29392ff17764",

  measurementId: "G-P4QTKB12FR",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

// const logInWithEmailAndPassword = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       name,
//       authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// const sendPasswordReset = async (email) => {
//   try {
//     await sendPasswordResetEmail(auth, email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

export const logout = () => {
  signOut(auth);
};
