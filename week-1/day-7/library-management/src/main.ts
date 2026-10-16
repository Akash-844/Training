import BookRepo = require("./repositories/book-repo");

const bookRepo = new BookRepo();

const books = [
  {
    id: 1,
    title: "TypeScript-Book",
    author: "Anders Hejlsberg",
    category: "Programming",
    totalCopies: 10,
    availableCopies: 8
  },
  {
    id: 2,
    title: "JavaScript-Book",
    author: "Brendan Eich",
    category: "Programming",
    totalCopies: 15,
    availableCopies: 15
  }
];

books.forEach((book) => {
  bookRepo.addBook(book);
});
console.log("All Books:", bookRepo.getAllBooks());
console.log(bookRepo.getBookById(3));

const updateBook = {
  id: 2,
  title: "JavaScript-Book",
  author: "Brendan Eich",
  category: "Programming",
  totalCopies: 15,
  availableCopies: 6
};
console.log("Updated Books:", bookRepo.updateBook(2, updateBook));
console.log(bookRepo.getAllBooks());
