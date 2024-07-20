import type { Book } from "../../types"
import SectionHeading from "../heading-section/heading-section"

export type BookCardProps = {
  book: Book
  distance: number
}

export const BookCard = ({ book, distance }: BookCardProps) => {
  return (
    <div>
      <SectionHeading color="purple">{book.title}</SectionHeading>
      <h1>BOOK</h1>
      <h3>distance {distance}</h3>
      <p>{book.title}</p>
    </div>
  )
}
