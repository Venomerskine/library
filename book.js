const lib = [];

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

function addBookToLibrary(title, author, pages, read = false) {
  const book = new Book(title, author, pages, read);
  lib.push(book);
  renderLibrary();
}

// Render books into DOM
function renderLibrary(containerId = 'books-container') {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  lib.forEach(book => {
    const card = document.createElement('article');
    card.className = 'book-card';
    card.dataset.id = book.id;

    const titleEl = document.createElement('h3');
    titleEl.textContent = book.title;

    const metaEl = document.createElement('p');
    metaEl.textContent = `${book.author}`;

    const pagesEl = document.createElement('p');
    pagesEl.textContent = `• ${book.pages} pages`;

    const readEl = document.createElement('p');
    readEl.textContent = book.read ? 'Read' : 'Not read yet';

    const actions = document.createElement('div');
    actions.className = 'book-actions';
   
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn ';
    removeBtn.setAttribute('aria-label', `Remove ${book.title}`);

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle Read';
    toggleBtn.className = 'toggle-btn';
    toggleBtn.setAttribute('aria-label', `Toggle read for ${book.title}`);

    actions.append(toggleBtn, removeBtn);

    card.append(titleEl, metaEl, pagesEl, readEl, actions);
    container.appendChild(card);
  });
}


// ==== Dialog & Form Handling ====

const dialog = document.querySelector('dialog');
const showButton = document.getElementById("New-Book-Button");
const createBookForm = document.getElementById("create-book");
const confirmBtn =  document.getElementById('confirmBtn')
const cancelBtn = document.getElementById('cancel')

showButton.addEventListener("click", () => {
  dialog.showModal();

cancelBtn.addEventListener('click', () => {
    dialog.close()
}) 

});

createBookForm.addEventListener('submit', function (event) {
  event.preventDefault();

  function getReadStatus() {
    const selectedRadio = document.querySelector('input[name="read_status"]:checked');
    if (!selectedRadio) return false;
    return selectedRadio.value === "yes";
  }

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = getReadStatus();

  addBookToLibrary(title, author, pages, read);

  this.reset();      
  dialog.close();    
});


renderLibrary();

const container = document.getElementById('books-container')

container.addEventListener('click', (e)=>{
    const removeButton = e.target.closest('.remove-btn')
    if(!removeButton) return
    const card = removeButton.closest('.book-card')
    if(!card) return
    const id = card.dataset.id
    if(!id) return 

    const idx = lib.findIndex(book => book.id === id)

    if(idx === -1){
        console.error('Book id not found', id)
        return 
    }
    lib.splice(idx, 1)
    renderLibrary()
})

container.addEventListener('click', (e) => {
    const toggleButton = e.target.closest('.toggle-btn');
    if (!toggleButton) return;

    const card = toggleButton.closest('.book-card');
    if (!card) return;
    const id = card.dataset.id;
    if (!id) return; 

    const bookToToggle = lib.find(book => book.id === id);

        if (!bookToToggle) {
        console.error('Book id not found for toggle:', id);
        return; 

        
    }

    bookToToggle.read = !bookToToggle.read;

    renderLibrary()
})
