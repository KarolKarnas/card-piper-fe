import styles from "./author-card.module.scss"
import { useTheme } from "../../hooks/use-theme"
import clsx from "clsx"
import { useUserMe } from "../../hooks/use-user-me"
import type { Author, Entity } from "../../types"
import { CardEntity } from "./card-role/card-entity"
import ReactionButtons from "../reaction-buttons/reaction-buttons"

export type AuthorCardProps = {
  personalityId: number
  author: Author
  distance: number
  entity: Entity
}

export const AuthorCard = ({
  personalityId,
  author,
  distance,
  entity,
}: AuthorCardProps) => {
  const userMe = useUserMe()
  const dark = useTheme()

  const isLoading = !userMe

  if (isLoading) {
    return <div>LOADING</div>
  }

  const changeDirectory = (name: string) => {
    console.log(name)
  }

  return (
    <div
      className={clsx(styles.card, {
        [styles.dark]: dark,
        [styles.light]: !dark,
      })}
      onClick={() => {
        changeDirectory(author.name)
      }}
    >
      <div
        className={clsx(styles["content-container"], {
          [styles.dark]: dark,
          [styles.light]: !dark,
        })}
      >
        <CardEntity entity={entity} />
        <h2>{author.name}</h2>
        {/* <h3>distance {distance}</h3> */}
        <h3 dangerouslySetInnerHTML={{ __html: author.bio }}></h3>

        <ReactionButtons
          entity={entity}
          personalityId={personalityId}
          targetId={author.id}
          reactions={author.reactions}
          personalityName={author.name}
        />
      </div>
    </div>
  )
}
