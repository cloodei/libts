import { eq, and } from "drizzle-orm"
import { Request, Response } from "express"
import { db } from "@/lib/db"
import { borrowTable, usersTable, booksTable } from "@/lib/schema"

export async function listBorrows(req: Request, res: Response) {
  const borrows = await db.select({
    username: usersTable.name,
    title: booksTable.title,
    publish_date: booksTable.publish_date,
    borrow_date: borrowTable.borrow_date
  }).from(borrowTable)
    .innerJoin(usersTable, eq(borrowTable.user_id, usersTable.id))
    .innerJoin(booksTable, eq(borrowTable.book_id, booksTable.id))

  return res.json(borrows)
}

export async function listBorrow(req: Request, res: Response) {
  const [borrow] = await db.select({
    username: usersTable.name,
    title: booksTable.title,
    publish_date: booksTable.publish_date,
    borrow_date: borrowTable.borrow_date
  }).from(borrowTable)
    .innerJoin(usersTable, eq(borrowTable.user_id, usersTable.id))
    .innerJoin(booksTable, eq(borrowTable.book_id, booksTable.id))
    .where(and(eq(borrowTable.user_id, Number(req.params.user_id)), eq(borrowTable.book_id, Number(req.params.book_id))))

  return res.json(borrow)
}

export async function listBorrowByBookID(req: Request, res: Response) {
  const borrow = await db.select({
    username: usersTable.name,
    title: booksTable.title,
    publish_date: booksTable.publish_date,
    borrow_date: borrowTable.borrow_date
  }).from(borrowTable)
    .innerJoin(usersTable, eq(borrowTable.user_id, usersTable.id))
    .innerJoin(booksTable, eq(borrowTable.book_id, booksTable.id))
    .where(eq(borrowTable.book_id, Number(req.params.book_id)))

  return res.json(borrow)
}

export async function listBorrowByUserID(req: Request, res: Response) {
  const borrow = await db.select({
    username: usersTable.name,
    title: booksTable.title,
    publish_date: booksTable.publish_date,
    borrow_date: borrowTable.borrow_date
  }).from(borrowTable)
    .innerJoin(usersTable, eq(borrowTable.user_id, usersTable.id))
    .innerJoin(booksTable, eq(borrowTable.book_id, booksTable.id))
    .where(eq(borrowTable.user_id, Number(req.params.user_id)))

  return res.json(borrow)
}

export async function createBorrow(req: Request, res: Response) {
  const { user_id, book_id, borrow_date } = req.body
  await db.insert(borrowTable).values({ user_id, book_id, borrow_date })

  return res.status(201).json("OK")
}
