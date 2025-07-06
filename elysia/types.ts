export type UserPayload = {
  name: string;
  email: string;
  password: string;
}

export type BookPayload = {
  title: string;
  author: string;
  content: string;
  category: string;
  publish_date: string;
}

export type BorrowPayload = {
  user_id: number;
  book_id: number;
  borrow_date: string;
}
