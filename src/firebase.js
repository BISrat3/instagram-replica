import firebase from "firebase"

// const firebaseApp = firebase.initializeApp({
//     apiKey: "AIzaSyDhjMjgxoe_bEHnoQGKoKn4gtPNBGJz_Ys",
//     authDomain: "instagram-replica-a6cd3.firebaseapp.com",
//     databaseURL:"https://instagram-replica-a6cd3-default-rtdb.firebaseio.com",
//     projectId: "instagram-replica-a6cd3",
//     storageBucket: "instagram-replica-a6cd3.appspot.com",
//     messagingSenderId: "522477813003",
//     appId: "1:522477813003:web:a7fbbc9a7344084ebb760e",
//     measurementId: "G-HRL80BVYP5",
// })

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB1VfO5gCCD9BhZBg-Dcn6LKtkEefIxU_o",
    authDomain: "instagram-clone-react-f0bc3.firebaseapp.com",
    projectId: "instagram-clone-react-f0bc3",
    databaseURL:"https://instagram-clone-react-f0bc3-default-rtdb.firebaseio.com",
    storageBucket: "instagram-clone-react-f0bc3.appspot.com",
    messagingSenderId: "240567308675",
    appId: "1:240567308675:web:735e2eadc0b94798f8e6b6",
    measurementId: "G-CJ95RL6C2J"
  });

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage}
