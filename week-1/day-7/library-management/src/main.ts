import BookRepo = require("./repositories/book-repo");
import BorrowRepo = require("./repositories/borrow-repo");
import BorrowService = require("./services/borrow-service");

const bookRepo = new BookRepo();
const borrowRepo = new BorrowRepo();

const borrowService = new BorrowService(bookRepo, borrowRepo);
//here we created sample books data
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

//Add Books
books.forEach((book) => {
  bookRepo.addBook(book);
});

//here we get error because there no book id called 3
console.log(bookRepo.getBookById(3));

//Here It Will Show Books data
console.log("All Books:", bookRepo.getAllBooks());

//Update Books
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

//if (Delete) {
//  console.log("Book Deleted");
// } else {
//   console.log("Book Not FOund!");
// }

// onsole.log(bookRepo.getAllBooks());

//onst result = bookRepo.deleteBook(100);
//console.log(result);

//borrowing Book
const first = borrowService.borrowBook(1, 101);
console.log("Borrow 1st time:", first.message, first.success);

const secound = borrowService.borrowBook(2, 101);
console.log("Borrow 2nd time:", secound.message, secound.success);

const third = borrowService.borrowBook(1, 101);
console.log("Borrow 3rd time:", third.message, third.success);

//return book
const returned = borrowService.returnBook(1, 101);
console.log("Return Book:", returned.message, returned.success);

//user can borrow again
const fourth = borrowService.borrowBook(1, 101);
console.log("Borrow 4th time:", fourth.message, fourth.success);

console.log("Final Books", bookRepo.getAllBooks());
console.log("Borrow history:", borrowRepo.getAllRecords());
