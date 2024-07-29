import { ReactionType, type Reaction } from "../../types"
import styles from "./reaction-button.module.scss"
import clsx from "clsx"
import { reactionIcons } from "../reaction-buttons/reaction-buttons"

export type ReactionButtonProps = {
  reaction: Reaction
}

export const ReactionButton = ({ reaction }: ReactionButtonProps) => {
  return (
    <button
      className={clsx(styles.reaction, {
        [styles.love]: reaction.type === ReactionType.LOVE,
        [styles.meh]: reaction.type === ReactionType.MEH,
        [styles.dislike]: reaction.type === ReactionType.DISLIKE,
        [styles.hate]: reaction.type === ReactionType.HATE,
      })}
      type="button"
      key={reaction.id}
    >
      {reactionIcons[reaction.type]}
    </button>
  )
}
