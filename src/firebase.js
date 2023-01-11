import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB1VfO5gCCD9BhZBg-Dcn6LKtkEefIxU_o",
  authDomain: "instagram-clone-react-f0bc3.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-f0bc3-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-react-f0bc3",
  storageBucket: "instagram-clone-react-f0bc3.appspot.com",
  messagingSenderId: "240567308675",
  appId: "1:240567308675:web:735e2eadc0b94798f8e6b6"
  });

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage}
