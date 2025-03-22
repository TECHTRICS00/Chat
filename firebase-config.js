import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBKXYrbwZzKUFO1dY4W1i6s6vYDhm4GThE",
    authDomain: "jo10-a9f93.firebaseapp.com",
    projectId: "jo10-a9f93",
    storageBucket: "jo10-a9f93.appspot.com",
    messagingSenderId: "475608534890",
    appId: "1:475608534890:web:98bd97f3199ed4ab6fdf13",
    measurementId: "G-M7TLFLKQ9F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };