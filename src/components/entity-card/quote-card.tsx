import clsx from "clsx"
import { useAppSelector } from "../../store/hooks"
import { selectUserMe } from "../../store/usersSlice"
import type { Entity, Quote } from "../../types"
import styles from "./quote-card.module.scss"
import { useTheme } from "../../hooks/use-theme"
import { CardEntity } from "./card-role/card-entity"
import ReactionButtons from "../reaction-buttons/reaction-buttons"

export type QuoteCardProps = {
  personalityId: number
  quote: Quote
  distance: number
  entity: Entity
}

export const QuoteCard = ({
  personalityId,
  quote,
  distance,
  entity,
}: QuoteCardProps) => {
  const dark = useTheme()
  const userMe = useAppSelector(selectUserMe)
  const isLoading = !userMe || !quote

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
        changeDirectory(quote.text)
      }}
    >
      <div
        className={clsx(styles["content-container"], {
          [styles.dark]: dark,
          [styles.light]: !dark,
        })}
      >
        <CardEntity entity={entity} />
        <h2>"{quote.text}"</h2>
        {quote.author.name || quote.origin ? (
          <div className={styles.credentials}>
            <p className={styles.origin}>{quote.origin}</p>
            <p className={styles.name}>{quote.author.name}</p>
          </div>
        ) : null}
        {/* <h3>distance {distance}</h3> */}

        <ReactionButtons
          entity={entity}
          personalityId={personalityId}
          targetId={quote.id}
          reactions={quote.reactions}
          personalityName={quote.text}
        />
      </div>
    </div>
  )
}
