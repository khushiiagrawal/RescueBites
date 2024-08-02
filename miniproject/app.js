const firebaseConfig = {
    apiKey: "AIzaSyA-WJoSEp71nmbqFvz62Yw7P4Qih5QIG7E",
    authDomain: "miniproject-edffe.firebaseapp.com",
    databaseURL: "https://miniproject-edffe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "miniproject-edffe",
    storageBucket: "miniproject-edffe.appspot.com",
    messagingSenderId: "210609554643",
    appId: "1:210609554643:web:8a14eef8d81a89ec2bc026"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();
  
  function addTask() {
      const foodAmount = document.getElementById("food-amount").value.trim();
      const restaurantName = document.getElementById("restaurant-name").value.trim();
      const phoneNumber = document.getElementById("phone-number").value.trim();
      const address = document.getElementById("address").value.trim();
  
      if (foodAmount !== "" && restaurantName !== "" && phoneNumber !== "" && address !== "") {
          db.collection("tasks").add({
              foodAmount: foodAmount,
              restaurantName: restaurantName,
              phoneNumber: phoneNumber,
              address: address,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          }).then(() => {
              alert("Food allocated!");
              document.getElementById("food-amount").value = "";
              document.getElementById("restaurant-name").value = "";
              document.getElementById("phone-number").value = "";
              document.getElementById("address").value = "";
          }).catch(error => {
              console.error("Error adding task: ", error);
          });
      }
  }
  
  function renderTasks(doc) {
      const taskList = document.getElementById("task-list");
      const taskItem = document.createElement("li");
      taskItem.className = "task-item";
      taskItem.setAttribute("data-id", doc.id);
      taskItem.innerHTML = `
          <div class="task-content">
              <h3>Amount of food: ${doc.data().foodAmount} kgs</h3>
              <p>Restaurant: ${doc.data().restaurantName}</p>
              <p>Phone: ${doc.data().phoneNumber}</p>
              <p>Address: ${doc.data().address}</p>
              <button onclick="deleteTask('${doc.id}')">Delete</button>
          </div>
      `;
      taskList.appendChild(taskItem);
  }
  
  db.collection("tasks")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
          const changes = snapshot.docChanges();
          changes.forEach(change => {
              if (change.type === "added") {
                  renderTasks(change.doc);
              } else if (change.type === "removed") {
                  removeTaskFromDOM(change.doc.id);
              }
          });
      });
  
  function deleteTask(id) {
      db.collection("tasks").doc(id).delete();
  }
  
  function removeTaskFromDOM(id) {
      const taskItem = document.querySelector(`li[data-id='${id}']`);
      if (taskItem) {
          taskItem.remove();
      }
  }
  
  function searchTasks() {
      const searchCriteria = document.getElementById('search-criteria').value;
      const searchInput = document.getElementById('search-input').value.toLowerCase();
      const taskItems = document.querySelectorAll('.task-item');
  
      taskItems.forEach(taskItem => {
          let targetText = '';
          if (searchCriteria === 'restaurant-name') {
              targetText = taskItem.querySelector('.task-content p:nth-of-type(1)').textContent.toLowerCase();
          } else if (searchCriteria === 'address') {
              targetText = taskItem.querySelector('.task-content p:nth-of-type(3)').textContent.toLowerCase();
          } else if (searchCriteria === 'food-amount') {
              targetText = taskItem.querySelector('.task-content h3').textContent.toLowerCase();
          }
  
          if (targetText.includes(searchInput)) {
              taskItem.style.display = 'flex';
          } else {
              taskItem.style.display = 'none';
          }
      });
  }
