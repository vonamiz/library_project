// Библиотека (не та, где книжки пылятся)
let myLibrary = [];

// Конструктор книги — когда хочешь быть как Java, но проще
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead; // true или false, как успехи на буткемпе?
}

// Сохраняем библиотеку, чтобы магия не исчезла при обновлении страницы
function saveLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// Загружаем библиотеку обратно (добро пожаловать обратно, дорогие книги)
function loadLibrary() {
  const data = localStorage.getItem("myLibrary");
  if (data) {
    const books = JSON.parse(data);
    // восстанавливаем книги как фениксов из пепла
    myLibrary = books.map(b => new Book(b.title, b.author, b.pages, b.isRead));
  }
}

// Рисуем наши книжки на экране (мам, я эстет)
function displayBooks() {
  const library = document.getElementById("library");
  library.innerHTML = ""; // сносим всё 

  myLibrary.forEach((book, index) => {
    const div = document.createElement("div");
    div.className = "book";
    div.innerHTML = `
      <h3>${book.title}</h3>
      <p>Автор: ${book.author}</p>
      <p>Страниц: ${book.pages}</p>
      <p>${book.isRead ? "Прочитана ✅" : "Не прочитана ❌"}</p>
      <button onclick="toggleRead(${index})">Сменить статус</button>
      <button onclick="deleteBook(${index})">Удалить</button>
    `;
    library.appendChild(div);
  });
}

// Когда нажимаем «Добавить книгу» — создаём шедевр
document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Не даём форме релоаднуться как бешеная

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  // Если поля не пустые — запускаем печать книжки
  if (title && author && pages) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book); // в коллекцию! (Покемонов бы так собирала)
    saveLibrary();
    displayBooks();
    this.reset(); // форма — очищена, душа — спокойна
  }
});

// Удаляем книгу — потому что иногда надо отпускать
function deleteBook(index) {
  myLibrary.splice(index, 1); // вырезаем как багу в коде
  saveLibrary();
  displayBooks();
}

// Тип прочитана/не прочитана
function toggleRead(index) {
  myLibrary[index].isRead = !myLibrary[index].isRead; // меняем true на false и наоборот, как настроение в понедельник
  saveLibrary();
  displayBooks();
}

// Удалить всю библиотеку (тут уже акт отчаяния, но иногда нужно)
document.getElementById("clear-library").addEventListener("click", function () {
  if (confirm("Ты точно хочешь удалить ВСЁ? 😱")) {
    myLibrary = [];
    localStorage.removeItem("myLibrary"); // RIP библиотека
    displayBooks();
  }
});

// Магия старта
loadLibrary();
displayBooks(); // и сразу всё рисуем, чтобы не было пусто, как в сердце при баге

//я усталь, хочется чиллить 