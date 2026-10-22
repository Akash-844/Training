import BookRepo = require("./repositories/book-repo");
import BorrowRepo = require("./repositories/borrow-repo");

const bookRepo = new BookRepo();
//here we created dummy books data
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

// const Delete = bookRepo.deleteBook(2);

// if (Delete) {
//   console.log("Book Deleted");
// } else {
//   console.log("Book Not FOund!");
// }

// console.log(bookRepo.getAllBooks());

// const result = bookRepo.deleteBook(100);
// console.log(result);

const borrowRepo = new BorrowRepo();

function bookBorrow(bookId: number, userId: number): boolean {
  const book = bookRepo.getBookById(bookId);

  if (!book) {
    console.log("Book Not Found");
    return false;
  }

  if (book.availableCopies <= 0) {
    console.log("No Copies Available");
    return false;
  }

  book.availableCopies--;

  const today = new Date();
  const dueDate = new Date(today);
  dueDate.setDate(dueDate.getDate() + 14);

  const record = {
    id: borrowRepo.getAllRecords().length + 1,
    bookId: book.id,
    userId: userId,
    borrowedDate: today.toISOString().slice(0, 10),
    dueDate: dueDate.toISOString().slice(0, 10),
    returnedDate: null
  };
  borrowRepo.addRecord(record);

  console.log("Book borrowed successfully");
  return true;
}

console.log("Borrow attempt 1:", bookBorrow(1, 101));
console.log("Borrow attempt 2:", bookBorrow(2, 102));
console.log("Borrow missing book:", bookBorrow(100, 101));

console.log("Updated books:", bookRepo.getAllBooks());
console.log("Borrow history:", borrowRepo.getAllRecords());
