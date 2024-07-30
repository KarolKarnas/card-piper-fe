import clsx from "clsx"
import { useAppSelector } from "../../store/hooks"
import { selectUserMe } from "../../store/usersSlice"
import type { Entity } from "../../types"
import { type Character } from "../../types"
import styles from "./character-card.module.scss"
import { useTheme } from "../../hooks/use-theme"
import { CardEntity } from "./card-role/card-entity"
import ReactionButtons from "../reaction-buttons/reaction-buttons"

export type CharacterCardProps = {
  personalityId: number
  character: Character
  distance: number
  entity: Entity
}

export const CharacterCard = ({
  personalityId,
  character,
  distance,
  entity,
}: CharacterCardProps) => {

  const dark = useTheme()
  const userMe = useAppSelector(selectUserMe)
  const isLoading = !userMe || !character

  if (isLoading) {
    return <div>LOADING</div>
  }

  const changeDirectory = (email: string) => {
    console.log(email)
  }

  return (
    <div
      className={clsx(styles.card, {
        [styles.dark]: dark,
        [styles.light]: !dark,
      })}
      onClick={() => {
        changeDirectory(character.name)
      }}
    >
      <div
        className={clsx(styles["content-container"], {
          [styles.dark]: dark,
          [styles.light]: !dark,
        })}
      >
        <CardEntity entity={entity} />
        <h2>{character.name}</h2>
        {/* <h3>distance {distance}</h3> */}
        <ul>Known from:{character.books.map((book, index) => <li key={index}>{book.title}</li>)}</ul>

          <ReactionButtons
            entity={entity}
            personalityId={personalityId}
            targetId={character.id}
            reactions={character.reactions}
            personalityName={character.name}
          />
      </div>
    </div>
  )
}
