import BookRepo = require("../repositories/book-repo");
import BorrowRepo = require("../repositories/borrow-repo");
import type { BorrowRecord } from "../models/borrow-record";

type Result = {
  success: boolean;
  message: string;
};

class BorrowService {
  //user can only borrow 2 books
  private readonly maxBooksPerUser = 2;

  constructor(
    private readonly bookRepo: BookRepo,
    private readonly borrowRepo: BorrowRepo
  ) {}
  //Borrow Book Function
  borrowBook(bookId: number, userId: number): Result {
    const book = this.bookRepo.getBookById(bookId);

    if (!book) {
      return { success: false, message: "Book not found" };
    }

    if (book.availableCopies <= 0) {
      return { success: false, message: "No copies available" };
    }

    const activeCount = this.borrowRepo
      .getAllRecords()
      .filter(
        (record) => record.userId === userId && record.returnedDate === null
      ).length;
    //If user has borrowed  2 books it will show false
    if (activeCount >= this.maxBooksPerUser) {
      return {
        success: false,
        message: "Borrowing limit reached"
      };
    }

    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + 14);

    const record: BorrowRecord = {
      id: this.borrowRepo.getAllRecords().length + 1,
      bookId: book.id,
      userId,
      borrowedDate: this.formatDate(today),
      dueDate: this.formatDate(dueDate),
      returnedDate: null
    };

    book.availableCopies--;
    this.borrowRepo.addRecord(record);

    return {
      success: true,
      message: "Book borrowed successfully"
    };
  }
  //ReturnBook function
  returnBook(bookId: number, userId: number): Result {
    const book = this.bookRepo.getBookById(bookId);

    if (!book) {
      return { success: false, message: "Book not found" };
    }

    const record = this.borrowRepo
      .getAllRecords()
      .find(
        (item) =>
          item.bookId === bookId &&
          item.userId === userId &&
          item.returnedDate === null
      );

    if (!record) {
      return {
        success: false,
        message: "No active borrowing record found"
      };
    }

    if (book.availableCopies >= book.totalCopies) {
      return {
        success: false,
        message: "All copies are already available"
      };
    }

    record.returnedDate = this.formatDate(new Date());
    book.availableCopies++;

    return {
      success: true,
      message: "Book returned successfully"
    };
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
}

export = BorrowService;
