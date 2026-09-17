const myLibrary = [];

function Book(title, author, pages, read, id) {
  // the constructor...

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array

  let id = crypto.randomUUID();

  const newBook = new Book(title, author, pages, read, id);


  myLibrary.push(newBook);
}

addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J. K. Rowling", "309", true);
addBookToLibrary("Harry Potter and the Chamber of Secrets", "J. K. Rowling", 341, true);
addBookToLibrary("Harry Potter and the Prisoner of Azkaban", "J. K. Rowling", 435, false);


for (const book of myLibrary) {
    console.log(book)
}

const form = document.getElementById("my-form");
const name = document.getElementById("field-name");
const author = document.getElementById("field-author");
const pages = document.getElementById("field-pages");
const read = document.getElementById("field-read");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    addBookToLibrary(name.value, author.value, pages.value, read.value);
    
    renderLibrary();
})

//

function renderLibrary() {
    const bodyTable = document.getElementById("table-library");
    bodyTable.innerHTML = ""; // Limpa a tabela antes de renderizar novamente

    myLibrary.forEach((book, index) => {
        // Criar a linha
        const tr = document.createElement("tr");

        // Criar as células de dados
        const tdTitle = document.createElement("td");
        tdTitle.textContent = book.title;

        const tdAuthor = document.createElement("td");
        tdAuthor.textContent = book.author;

        const tdPages = document.createElement("td");
        tdPages.textContent = book.pages;

        const tdRead = document.createElement("td");
        tdRead.textContent = book.read;

         // Criar a célula da ação e o botão de deletar
        const tdReadChange = document.createElement("td");
        const readChangeBtn = document.createElement("button");
        readChangeBtn.textContent = "Read/Unread";

        // Evento para ler ou desler um livro
        readChangeBtn.addEventListener("click", function() {
            book.read = !book.read;
            renderLibrary();
        });


        tdReadChange.appendChild(readChangeBtn);

        // Criar a célula da ação e o botão de deletar
        const tdAction = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        // Evento para remover o livro
        deleteBtn.addEventListener("click", function() {
            // 1. Remove do array pelo índice
            myLibrary.splice(index, 1);

            // 2. Atualiza a tela re-renderizando a lista
            renderLibrary();
        });

        // Montar a estrutura da linha
        tdAction.appendChild(deleteBtn);
        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdPages);
        tr.appendChild(tdRead);
        tr.appendChild(tdReadChange);
        tr.appendChild(tdAction);

        // Adicionar a linha na tabela
        bodyTable.appendChild(tr);
    });
}

// Chamar a função para exibir os livros iniciais
renderLibrary();