import type { BorrowRecord } from "../models/borrow-record";

class BorrowRepo {
  private borrowRecords: BorrowRecord[] = [];

  addRecord(record: BorrowRecord): void {
    this.borrowRecords.push(record);
  }
  getAllRecords(): BorrowRecord[] {
    return this.borrowRecords;
  }
  getRecordById(id: number): BorrowRecord | undefined {
    return this.borrowRecords.find((record) => record.id === id);
  }
}

export = BorrowRepo;
