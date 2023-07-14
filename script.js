let myLibrary = [];
let mainContent = document.querySelector(".main-content");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pageCountInput = document.querySelector("#page-count-input");
const statusInput = document.querySelector("#status-input");

window.addEventListener('load', function() {
    for (let book of myLibrary) {
        let card = createCard(book);
        mainContent.appendChild(card);
    }
})

form.addEventListener("submit", event => {
    event.preventDefault();
    addBookToLibrary();
});

// Book constructor
function Book(title, author, pageCount, status) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.status = status;
}

function addBookToLibrary() {
    let currentBook = new Book(`${titleInput.value}`, `${authorInput.value}`, `${pageCountInput.value}`, `${statusInput.value}`)
    myLibrary.push(currentBook);
    let card = createCard(currentBook);
    mainContent.appendChild(card);
}

// This function creates a card.
function createCard(Book) {

    // Create card.
    let card = document.createElement("div");
    card.className = "card";

    // Create content inside the card.
    let cardContent;
    for (let property in Book) {

        // Create div with class.
        cardContent = document.createElement("div");
        cardContent.className = `${property}`;

        // The content is title.
        if (property === "title"){
            cardContent.textContent = `${Book[property]}`;
        }
        // The content is author.
        else if (property === "author") {
            cardContent.textContent = `By ${Book[property]}`; 
        }
        // The content is page count.
        else if (property === "pageCount") {
            cardContent.textContent = `${Book[property]} pages`;
        }
        // The content is status.
        else if (property === "status") {
            // Create button.
            let statusButton = document.createElement("button");
            statusButton.textContent = Book[property] ? "Read" : "Not Read";
            
            // Append button
            cardContent.appendChild(statusButton)
        }
        else {
            cardContent.textContent = "Jaizzer";
        }
    
        // Append card content inside the card.
        card.appendChild(cardContent);
    }

    return card;
}