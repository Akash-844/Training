import type { Book } from "../models/book-record";

class BookRepo {
  //Book[] means this array contains only book objects
  private booksList: Book[] = [];

  // here we created addBook method to add book details to array
  addBook(book: Book): void {
    this.booksList.push(book);
  }
  //here we created getAllBooks method to get all the books available in books array
  getAllBooks(): Book[] {
    return this.booksList;
  }
  //here we created getbookbyid method to get the book details by using book id number
  getBookById(id: number): Book | undefined {
    return this.booksList.find((book) => book.id === id);
  }
  //here we created updatebook method to update the details of book by  using bookId
  updateBook(id: number, updateBook: Book): boolean {
    const index = this.booksList.findIndex((book) => book.id === id);

    if (index === -1) {
      return false;
    }
    this.booksList[index] = updateBook;
    return true;
  }
  //here we created deletebook method to delete book by bookId
  deleteBook(id: number): boolean {
    const index = this.booksList.findIndex((book) => book.id == id);
    if (index === -1) {
      return false;
    }
    this.booksList.splice(index, 1);
    return true;
  }
}

export = BookRepo;
