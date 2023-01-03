import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "",
    authDomain: "instagram-replica-466a4.firebaseapp.com",
    databaseURL: "https://instagram-replica-466a4-default-rtdb.firebaseio.com",
    projectId: "instagram-replica-466a4",
    storageBucket: "instagram-replica-466a4.appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage}