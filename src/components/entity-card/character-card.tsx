import type { Character } from "../../types"
import SectionHeading from "../heading-section/heading-section"

export type CharacterCardProps = {
  character: Character
  distance: number
}

export const CharacterCard = ({ character, distance }: CharacterCardProps) => {
  return (
    <div>
      <SectionHeading color="orange">{character.name}</SectionHeading>
      <h1>Character</h1>
      <h3>distance {distance}</h3>
      {character.books.map(book => (
        <p key={book.id}>{book.title}</p>
      ))}
    </div>
  )
}
