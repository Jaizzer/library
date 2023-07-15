let myLibrary = [];
let mainContent = document.querySelector(".main-content");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pageCountInput = document.querySelector("#page-count-input");
const statusInput = document.querySelector("#status-input");

window.addEventListener('load', function() {
    if (localStorage.getItem('myLibrary')) {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }

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
function Book(title, author, pageCount, status, id) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.status = status;
    this.id = id;
}

function addBookToLibrary() {
    let currentBook = new Book(`${titleInput.value}`, `${authorInput.value}`, `${pageCountInput.value}`, `${statusInput.value}`, `${Date.now()}`)
    myLibrary.push(currentBook);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    let card = createCard(currentBook);
    mainContent.appendChild(card);
}

// This function creates a card.
function createCard(Book) {

    // Create card.
    let card = document.createElement("div");
    card.className = "card";
    card.id = Book.id;

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
            statusButton.textContent = Book[property];
            statusButton.className = (Book[property] === "Read") ? "read" : "not-read";

            statusButton.addEventListener("click", ()=> {
                if (statusButton.textContent === "Read") {
                    statusButton.textContent = "Not Read";
                    statusButton.className = "not-read";
                }
                else {
                    statusButton.textContent = "Read";
                    statusButton.className = "read";
                }
            })
    
            // Append button
            cardContent.appendChild(statusButton)
        }
    
        // Append card content inside the card.
        card.appendChild(cardContent);
    }

    // Add action buttons inside card.
    cardContent = document.createElement("div");
    cardContent.className = "actions";

    let editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.innerHTML = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>pencil</title>
                                <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                            </svg>`;
    cardContent.appendChild(editButton);


    let deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerHTML = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>trash-can-outline</title>
                                <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                            </svg>`;
    cardContent.appendChild(deleteButton);

    // Append card content inside the card.
    card.appendChild(cardContent);

    return card;
}
