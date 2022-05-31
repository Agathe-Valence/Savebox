import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAyNrkbdVo7PfUFmViT0sbys0Juap9Rvjw",
  authDomain: "savebox2021.firebaseapp.com",
  databaseURL: "https://savebox2021-default-rtdb.firebaseio.com",
  projectId: "savebox2021",
  storageBucket: "savebox2021.appspot.com",
  messagingSenderId: "74965765734",
  appId: "1:74965765734:web:4a5a60a5707587a53fa7a7",
  measurementId: "G-172E4Z8LQ2"
};

if (!firebase.apps.length) {
  const app = firebase.initializeApp(firebaseConfig);
  const database = getDatabase(app);

}


export { firebase };