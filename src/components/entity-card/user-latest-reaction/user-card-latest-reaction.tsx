import { Entity, type Reaction } from "../../../types"
import { ReactionIcon } from "../../reaction-icon/reaction-icon"
import styles from "./user-card-latest-reaction.module.scss"
import clsx from "clsx"

const getContentFromReaction = (reaction: Reaction): React.ReactNode => {
  switch (reaction.entity) {
    case Entity.CHARACTER:
      return reaction.character?.name
    case Entity.USER:
      return reaction.reactedUser?.email
    case Entity.AUTHOR:
      return reaction.author?.name
    case Entity.BOOK:
      return reaction.book?.title
    case Entity.QUOTE:
      return reaction.quote?.text
    default:
      return null
  }
}

export type UserLatestReactionProps = {
  reactions: Reaction[]
  email?: string
}

export const UserLatestReaction = ({
  reactions,
  email,
}: UserLatestReactionProps) => {
  return (
    <div className={styles.container}>
      {email && <h5>{email} latest reactions:</h5>}
      <ul>
        {reactions.map((reaction, index) => {
          const content = getContentFromReaction(reaction)

          return content ? (
            <li
              key={index}
              className={clsx({
                [styles.character]: reaction.entity === Entity.CHARACTER,
                [styles.user]: reaction.entity === Entity.USER,
                [styles.author]: reaction.entity === Entity.AUTHOR,
                [styles.book]: reaction.entity === Entity.BOOK,
                [styles.quote]: reaction.entity === Entity.QUOTE,
              })}
            >
              <ReactionIcon reactionType={reaction.type} /> {content}
            </li>
          ) : null
        })}
      </ul>
    </div>
  )
}
