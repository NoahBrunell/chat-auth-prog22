// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQmMQR8RWope6IqpZaxweb-sHM-9vFpd0",
    authDomain: "chattapp-83a8d.firebaseapp.com",
    databaseURL: "https://chattapp-83a8d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chattapp-83a8d",
    storageBucket: "chattapp-83a8d.appspot.com",
    messagingSenderId: "91904429543",
    appId: "1:91904429543:web:534f39381ec805361b4142"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const loginModal = new bootstrap.Modal('#login-modal')
loginModal.show()

// Auth
// ====================================================================================

//Set variable with bootstrap modal
document.querySelector("#login-button").addEventListener("click", function () {
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const auth = getAuth();

    // Sign in with Firebase
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            // Signed in 
            const user = userCredential.user;
            console.log(user)

            // Hide modal
            loginModal.hide()
            initDatabase()
        })
        .catch((error) => {
            console.log(error)
        });

})

// Database
// ====================================================================================


// initializes Realtime Database and get a reference service
const db = getDatabase(app);
function initDatabase() {


    // create reference, where in the database we want to take info from
    const chatRef = ref(db, '/chat');


    // listens for database changes
    onChildAdded(chatRef, function (data) {

        // create element and append to list element
        const message = document.createElement("li")
        message.innerText = new Date(data.key).toLocaleDateString("fi-FI") + ": " + data.val();

        list.appendChild(message)
    })
}


// New message
const input = document.querySelector("input");
const list = document.querySelector("ul")

input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {

        // create 'unique' id for message
        const messageId = new Date().toUTCString();

        // send to database
        set(ref(db, "chat/" + messageId), input.value)


        // clear input
        input.value = "";
    }
})