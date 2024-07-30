import clsx from "clsx"
import { useAppSelector } from "../../store/hooks"
import { selectUserMe } from "../../store/usersSlice"
import type { Book, Entity } from "../../types"
import styles from "./book-card.module.scss"
import { useTheme } from "../../hooks/use-theme"
import { CardEntity } from "./card-role/card-entity"
import ReactionButtons from "../reaction-buttons/reaction-buttons"

export type BookCardProps = {
  personalityId: number
  book: Book
  distance: number
  entity: Entity
}

export const BookCard = ({
  personalityId,
  book,
  distance,
  entity,
}: BookCardProps) => {
  const dark = useTheme()
  const userMe = useAppSelector(selectUserMe)
  const isLoading = !userMe || !book

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
        changeDirectory(book.title)
      }}
    >
      <div
        className={clsx(styles["content-container"], {
          [styles.dark]: dark,
          [styles.light]: !dark,
        })}
      >
        <CardEntity entity={entity} />
        <h2>"{book.title}"</h2>
        <h3>distance {distance}</h3>
        <ul>
          Characters in the book:
          {book.characters.map((character, index) => (
            <li key={index}>{character.name}</li>
          ))}
        </ul>

        <ReactionButtons
          entity={entity}
          personalityId={personalityId}
          targetId={book.id}
          reactions={book.reactions}
          personalityName={book.title}
        />
      </div>
    </div>
  )
}
