

const lib = []

function Book(title, author, pages, read = false) {
  if (!new.target) throw new Error("Use 'new Book(...)' to construct a Book");
  this.id = crypto.randomUUID();
  this.title = String(title);
  this.author = String(author);
  this.pages = Number(pages) || 0;
  this.read = Boolean(read);
}


Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
};

let addBookToLibrary = (title, author,pages,read = false) => {
    const book = new Book(title, author, pages, read)
    lib.push(book)
    return book
}


// UI-layer: render the library into the DOM
function renderLibrary(containerId = 'books-container') {
  const container = document.getElementById(containerId);
  if (!container) throw new Error(`Container with id "${containerId}" not found.`);

  // clear then re-build from data (idempotent)
  container.innerHTML = '';

  lib.forEach(book => {
    const card = document.createElement('article');
    card.className = 'book-card';
    card.dataset.id = book.id; // binds DOM to data

    // Title
    const titleEl = document.createElement('h3');
    titleEl.textContent = book.title;

    // Meta (author + pages)
    const metaEl = document.createElement('p');
    metaEl.textContent = `${book.author}`;

    const pagesEl  = document.createElement('p');
    pagesEl.textContent = `• ${book.pages} pages`


    // Read status
    const readEl = document.createElement('p');
    readEl.textContent = book.read ? 'Read' : 'Not read yet';
    readEl.className = 'book-read-status';

    // Compose card
    card.append(titleEl, metaEl, pagesEl, readEl);
    container.appendChild(card);
  });
}

addBookToLibrary('1984', 'George Orwell', 328, true);
addBookToLibrary('The Hobbit', 'J. R. R. Tolkien', 310, false);

renderLibrary();


const showButton = document.getElementById("New-Book-Button")
const newBook = document.getElementById("create-book")
const confirmBtn = document.getElementById("confirmBtn")

showButton.addEventListener("click", () => {
    newBook.showModal()
})




