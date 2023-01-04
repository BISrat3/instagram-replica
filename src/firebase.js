import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDhjMjgxoe_bEHnoQGKoKn4gtPNBGJz_Ys",
    authDomain: "instagram-replica-a6cd3.firebaseapp.com",
    databaseURL:"https://instagram-replica-a6cd3-default-rtdb.firebaseio.com",
    projectId: "instagram-replica-a6cd3",
    storageBucket: "instagram-replica-a6cd3.appspot.com",
    messagingSenderId: "522477813003",
    appId: "1:522477813003:web:a7fbbc9a7344084ebb760e",
    measurementId: "G-HRL80BVYP5",
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage}