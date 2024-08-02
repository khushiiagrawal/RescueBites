import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
    const auth = getAuth(app);
    const db = getDatabase(app);

    // Submit button
    const submitButton = document.getElementById('submit');
    if (submitButton) {
        submitButton.addEventListener("click", function (event) {
            event.preventDefault();

            // Inputs
            const firstNameInput = document.getElementById('first_name');
            const emailInput = document.getElementById('floatingInput');
            const passwordInput = document.getElementById('floatingPassword');
            const firstName = firstNameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    alert("Account created successfully!");

                    // Save user data to the database
                    set(ref(db, 'Users/' + user.uid), {
                        firstName: firstName,
                        email: email,
                    }).then(() => {
                        alert("User data added to database successfully!");
                    }).catch((error) => {
                        alert("Failed to add user data to database.");
                        console.error(error);
                    });
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage);
                    console.error(error);
                });
        });
    } else {
        console.error("Submit button not found.");
    }
});
