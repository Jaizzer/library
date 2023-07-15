// Initialize array to hold books.
let myLibrary = [];

// Access the main content area for appending cards later.
let mainContent = document.querySelector(".main-content");

// Access the form section and inputs.
const form = document.querySelector("form");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pageCountInput = document.querySelector("#page-count-input");
const statusInput = document.querySelector("#status-input");

// This event is triggered everytime the page loads/reloads.
window.addEventListener('load', function() {

    // Obtain previously saved contents of myLibrary array.
    if (localStorage.getItem('myLibrary')) {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }

    // Render the cards.
    for (let book of myLibrary) {
        let card = createCard(book);
        mainContent.appendChild(card);
    }
})

// Create the book from form input but don't submit to server.
form.addEventListener("submit", event => {

    // Hide form when submitted.
    formContainer.className = "form-container hidden";

    // Prevent page reload due to server submission.
    event.preventDefault();

    // Render and save the book.
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

// This function saves new book object in myLibrary array and also renders it in a card.
function addBookToLibrary() {
    // Create a book object.
    let currentBook = new Book(`${titleInput.value}`, `${authorInput.value}`, `${pageCountInput.value}`, `${statusInput.value}`, `${Date.now()}`)

    // Add the book object to the myLibrary array.
    myLibrary.push(currentBook);

    // Update myLibrary in local storage.
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

    // Render the corresponding the book's corresponding card in the main-content area.
    let card = createCard(currentBook);
    mainContent.appendChild(card);
}

// This function creates a card.
function createCard(Book) {

    // Create card.
    let card = document.createElement("div");
    card.className = "card";
    card.id = `code-${Book.id}`;

    // Create content inside the card.
    let cardContent;
    for (let property in Book) {
        
        // Only render non-id book info.
        if (property !== "id") {
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
    }

    // Add action buttons inside card.
    cardContent = document.createElement("div");
    cardContent.className = "actions";

    // Add edit button.
    let editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.innerHTML = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>pencil</title>
                                <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                            </svg>`;
    cardContent.appendChild(editButton);
    
    // Add delete button.
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerHTML = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>trash-can-outline</title>
                                <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                            </svg>`;
    
    // Add functionality to the delete button.
    deleteButton.addEventListener('click', function() {
        deleteBook(this);
    })
    
    cardContent.appendChild(deleteButton);

    // Append card content inside the card.
    card.appendChild(cardContent);

    return card;
}


// This function deletes a book.
function deleteBook(button) {

    // Get the id of the card containing the current buton.
    let cardId = button.parentNode.parentNode.id

    // Get the corresponding card.
    let card = document.querySelector(`#${cardId}`);

    // Delete the card.
    card.remove();

    // Remove the book in myLibrary
    for(let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].id === `${cardId.split("-")[1]}`) {
            myLibrary.splice(i, 1);
        }
    }

    // Update myLibrary in local storage.
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}



// Access the book adding button.
const bookAdder = document.querySelector(".book-adder");

// Access the form conainter.
const formContainer = document.querySelector(".form-container");

// Popup the form when book adder is pressed.
bookAdder.addEventListener("click", function() {
    formContainer.className = "form-container visible";
});

// Access cancel button.
const cancelButton = document.querySelector("#cancel");
cancelButton.addEventListener("click", function() {
    formContainer.className = "form-container hidden";
})
