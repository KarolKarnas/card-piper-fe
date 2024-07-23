import { useCreateReaction } from "../../hooks/use-create-reaction"
import { useAppSelector } from "../../store/hooks"
import { selectUserMe } from "../../store/usersSlice"
import { Entity, ReactionType, type Character } from "../../types"
import { createReactionArgs } from "../../utils/functions"
import SectionHeading from "../heading-section/heading-section"

export type CharacterCardProps = {
  character: Character
  distance: number
}



export const CharacterCard = ({ character, distance }: CharacterCardProps) => {
  const { handleCreateReaction } = useCreateReaction()

  const userMe = useAppSelector(selectUserMe)

  const isLoading = !userMe || !character

  if (isLoading) {
    return <div>LOADING</div>
  }

  const handleClick = (type: ReactionType) => {
    const args = createReactionArgs(userMe.id, Entity.CHARACTER, type, character.id)
    handleCreateReaction(args)
  }

  return (
    <div>
      <SectionHeading color="orange">{character.name}</SectionHeading>
      <h1>Character</h1>
      <h3>distance {distance}</h3>
      {character.books.map(book => (
        <p key={book.id}>{book.title}</p>
      ))}
      {Object.values(ReactionType).map(type => (
        <button key={type} onClick={() => handleClick(type)}>{type}</button>
      ))}
    </div>
  )
}
