import { useCreateReaction } from "../../hooks/use-create-reaction"
import { useAppSelector } from "../../store/hooks"
import { selectUserMe } from "../../store/usersSlice"
import { Entity, ReactionType, type Character } from "../../types"
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

  const handleClick = () => {
    handleCreateReaction({
      userId: userMe.id,
      type: ReactionType.LIKE,
      entity: Entity.CHARACTER,
      favorite: false,
      list: false,
      characterId: character.id,
    })
  }
  return (
    <div>
      <SectionHeading color="orange">{character.name}</SectionHeading>
      <h1>Character</h1>
      <h3>distance {distance}</h3>
      {character.books.map(book => (
        <p key={book.id}>{book.title}</p>
      ))}
      <button onClick={() => handleClick()}>LIKE</button>
    </div>
  )
}
