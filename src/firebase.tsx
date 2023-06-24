import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCRUbseCTlQ7-g-OYjgDDkToaI2rYMbmxo',
  authDomain: 'scissors-96135.firebaseapp.com',
  projectId: 'scissors-96135',
  storageBucket: 'scissors-96135.appspot.com',
  messagingSenderId: '582446568271',
  appId: '1:582446568271:web:07512181050e2842efab3a',
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const firestore = firebase.firestore();
const auth = firebase.auth();

if (process.env.NODE_ENV === 'development') {
  firestore.useEmulator('localhost', 8080);
  auth.useEmulator('http://localhost:9099');
}
export { firestore, auth, app, db, firebase };
