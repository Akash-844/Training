export interface BorrowRecord {
  id: number;
  bookId: number;
  userId: number;
  borrowedDate: string;
  dueDate: string;
  returnedDate: string | null;
}
