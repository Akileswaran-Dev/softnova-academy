import { BOOKS } from '../data/books';

export function generateStaticParams() {
  return BOOKS.map((book) => ({
    id: book.id.toString(),
  }));
}

export default function BookLayout({ children }) {
  return children;
}
