import { auth, db } from "./firebase-config.js";
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp, doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

let userName = "";

// Fetch user's name
auth.onAuthStateChanged(async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            userName = userDoc.data().name;
        }
    } else {
        window.location.href = "login.html";
    }
});

// Load messages in real-time
const messagesRef = collection(db, "messages");
const q = query(messagesRef, orderBy("timestamp"));

onSnapshot(q, snapshot => {
    document.getElementById("messages").innerHTML = "";
    const messages = [];
    snapshot.forEach(doc => {
        const message = doc.data();
        messages.push({ id: doc.id, ...message });
        document.getElementById("messages").innerHTML += `<p><strong>${message.user}:</strong> ${message.text}</p>`;
    });

    // Check if the number of messages exceeds 10
    if (messages.length > 10) {
        // Delete the oldest message
        const oldestMessage = messages[0];
        deleteDoc(doc(db, "messages", oldestMessage.id));
    }
}, error => {
    console.error("Error loading messages: ", error);
});

// Send Message
window.sendMessage = async function () {
    const messageInput = document.getElementById("messageInput").value;
    const user = auth.currentUser;

    if (user && messageInput) {
        try {
            await addDoc(messagesRef, {
                user: userName,
                text: messageInput,
                timestamp: serverTimestamp()
            });
            document.getElementById("messageInput").value = "";
            console.log("Message sent successfully");
        } catch (error) {
            console.error("Error sending message: ", error);
            alert("Error sending message: " + error.message);
        }
    } else {
        alert("You must be logged in to send a message.");
    }
};