import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function () {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDTuObtjIzb16G7-yX-318P2f-nnkOwTxA",
        authDomain: "database-f3498.firebaseapp.com",
        databaseURL: "https://database-f3498-default-rtdb.firebaseio.com",
        projectId: "database-f3498",
        storageBucket: "database-f3498.appspot.com",
        messagingSenderId: "702974085996",
        appId: "1:702974085996:web:cd9b551b7768245e35c149"
      };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Submit button
    const submitButton = document.getElementById('submit');
    if (submitButton) {
        submitButton.addEventListener("click", function (event) {
            event.preventDefault();

            // Inputs
            const emailInput = document.getElementById('floatingInput');
            const passwordInput = document.getElementById('floatingPassword');
            const email = emailInput.value;
            const password = passwordInput.value;

            const auth = getAuth();

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    alert("Login successful!");
                    console.log(user);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert("Sign in failed: " + errorMessage);
                    console.error(error);
                });
        });
    } else {
        console.error("Submit button not found.");
    }
});
