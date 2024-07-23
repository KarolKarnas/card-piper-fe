import type { Author } from "../../types"
import SectionHeading from "../heading-section/heading-section"

export type AuthorCardProps = {
  author: Author
  distance: number
}

export const AuthorCard = ({ author, distance }: AuthorCardProps) => {
  return (
    <div style={{height: "500px"}}>
      <SectionHeading color="blue">{author.name}</SectionHeading>
      <h1>AUTHOR</h1>
      <h3>distance {distance}</h3>
      <p>{author.name}</p>
    </div>
  )
}
