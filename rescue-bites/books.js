import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const colRef = collection(db, 'books');

const fetchBooks = async () => {
    try {
        const snapshot = await getDocs(colRef);
        let books = [];
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id });
        });
        return books;
    } catch (err) {
        console.error(err.message);
        return [];
    }
};

const renderBooks = (books, container) => {
    container.innerHTML = ''; // Clear existing list
    books.forEach(book => {
        const li = document.createElement('li');
        const card = document.createElement('div');
        card.classList.add('book-card');

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
        `;

        // Add click event to navigate to a new page
        card.addEventListener('click', () => {
            window.location.href = `main.html?id=${book.id}`;
        });

        li.appendChild(card);
        container.appendChild(li);
    });
};

export { fetchBooks, renderBooks, colRef, addDoc, deleteDoc, doc };
