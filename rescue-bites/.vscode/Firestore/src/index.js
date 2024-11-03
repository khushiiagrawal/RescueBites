import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection, getDocs, addDoc, deleteDoc, doc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-yncjKZs8ZjxniipHZFVrGzW9mvjNAyA",
    authDomain: "fir-9-dojo-f4852.firebaseapp.com",
    projectId: "fir-9-dojo-f4852",
    storageBucket: "fir-9-dojo-f4852.appspot.com",
    messagingSenderId: "124390811486",
    appId: "1:124390811486:web:948e7e333cb20adf64d1cf"
};

initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, 'books');

const booksList = document.querySelector('.books-list');

const renderBooks = (books) => {
    booksList.innerHTML = ''; // Clear existing list
    books.forEach(book => {
        const li = document.createElement('li');
        const idDiv = document.createElement('div');
        const titleDiv = document.createElement('div');
        const authorDiv = document.createElement('div');

        idDiv.textContent = `ID: ${book.id}`;
        idDiv.classList.add('book-item');
        titleDiv.textContent = `Title: ${book.title}`;
        titleDiv.classList.add('book-item');
        authorDiv.textContent = `Author: ${book.author}`;
        authorDiv.classList.add('book-item');

        li.appendChild(idDiv);
        li.appendChild(titleDiv);
        li.appendChild(authorDiv);

        booksList.appendChild(li);
    });
};

const fetchBooks = () => {
    getDocs(colRef).then((snapshot) => {
        let books = [];
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id });
        });
        renderBooks(books);
    }).catch(err => {
        console.log(err.message);
    });
};

fetchBooks();

const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    }).then(() => {
        addBookForm.reset();
        fetchBooks();
    });
});

const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const docRef = doc(db, 'books', deleteBookForm.id.value);
    deleteDoc(docRef).then(() => {
        deleteBookForm.reset();
        fetchBooks();
    });
});
