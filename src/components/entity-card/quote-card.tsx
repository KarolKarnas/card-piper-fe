import type { Quote } from "../../types"
import SectionHeading from "../heading-section/heading-section"

export type QuoteCardProps = {
  quote: Quote
  distance: number
}

export const QuoteCard = ({ quote, distance }: QuoteCardProps) => {
  return (
    <div>
      <SectionHeading color="blue">{quote.text}</SectionHeading>
      <h1>Quote</h1>
      <h3>distance {distance}</h3>
      <p>{quote.author.name}</p>
    </div>
  )
}
