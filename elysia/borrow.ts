import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { borrowTable, usersTable, booksTable } from "@/lib/schema";
import { BorrowPayload } from "@/lib/types";

export async function listBorrows() {
  return await db
    .select({
      username: usersTable.name,
      title: booksTable.title,
      publish_date: booksTable.publish_date,
      borrow_date: borrowTable.borrow_date
    })
    .from(borrowTable)
    .innerJoin(usersTable, eq(borrowTable.user_id, usersTable.id))
    .innerJoin(booksTable, eq(borrowTable.book_id, booksTable.id))
}

export async function listBorrowByID(user_id: number, book_id: number) {
  return await db
    .select({
      username: usersTable.name,
      title: booksTable.title,
      publish_date: booksTable.publish_date,
      borrow_date: borrowTable.borrow_date
    })
    .from(borrowTable)
    .innerJoin(usersTable, eq(borrowTable.user_id, usersTable.id))
    .innerJoin(booksTable, eq(borrowTable.book_id, booksTable.id))
    .where(and(eq(borrowTable.user_id, user_id), eq(borrowTable.book_id, book_id)))
}

export async function listBorrowByUserID(user_id: number) {
  return await db
    .select({
      username: usersTable.name,
      title: booksTable.title,
      publish_date: booksTable.publish_date,
      borrow_date: borrowTable.borrow_date
    })
    .from(borrowTable)
    .innerJoin(usersTable, eq(borrowTable.user_id, usersTable.id))
    .innerJoin(booksTable, eq(borrowTable.book_id, booksTable.id))
    .where(eq(borrowTable.user_id, user_id))
}

export async function listBorrowByBookID(book_id: number) {
  return await db
    .select({
      username: usersTable.name,
      title: booksTable.title,
      publish_date: booksTable.publish_date,
      borrow_date: borrowTable.borrow_date
    })
    .from(borrowTable)
    .innerJoin(usersTable, eq(borrowTable.user_id, usersTable.id))
    .innerJoin(booksTable, eq(borrowTable.book_id, booksTable.id))
    .where(eq(borrowTable.book_id, book_id))
}

export async function createBorrow({ user_id, book_id, borrow_date }: BorrowPayload) {
  return await db.insert(borrowTable).values({ user_id, book_id, borrow_date })
}
