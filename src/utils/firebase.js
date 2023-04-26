import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';

const firebaseConfig = {
  apiKey: 'AIzaSyAm7ofSgc9y3CZtHt21fMXBXOLRT-ORoBI',

  authDomain: 'in-house-cloud.firebaseapp.com',

  databaseURL:
    'https://in-house-cloud-default-rtdb.asia-southeast1.firebasedatabase.app',

  projectId: 'in-house-cloud',

  storageBucket: 'in-house-cloud.appspot.com',

  messagingSenderId: '852599793773',

  appId: '1:852599793773:web:1ad01b415a29392ff17764',

  measurementId: 'G-P4QTKB12FR',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

export const logout = () => {
  signOut(auth);
};
