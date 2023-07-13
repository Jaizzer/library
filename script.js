let myLibrary = [];
let mainContent = document.querySelector(".main-content");

// Book constructor
function Book(title, author, pageCount, status) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.status = status;
}

function addBookToLibrary() {
    // do stuff here
    for (let i = 0; i < 5; i++) {
        let currentBook = new Book(`Book ${i+1}`,`Author ${i+1}`, `${300 - i}`, `${(i+1) % 2 === 0}` )
        myLibrary.push(currentBook);
    }
}