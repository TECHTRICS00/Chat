import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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

// Register User
window.register = async function () {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user details to Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            uid: user.uid
        });

        alert("Registration Successful!");
        window.location.href = "chat.html";
    } catch (error) {
        alert(error.message);
    }
};

// Login User
window.login = function () {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Login Successful!");
            window.location.href = "chat.html";
        })
        .catch(error => alert(error.message));
};

// Logout
window.logout = function () {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    });
};