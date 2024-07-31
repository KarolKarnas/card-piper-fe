import { ReactionType, type Reaction } from "../../types"
import styles from "./reaction-button.module.scss"
import clsx from "clsx"
import { reactionIcons } from "../reaction-buttons/reaction-buttons"

export type ReactionButtonProps = {
  reactionType: ReactionType
}

export const ReactionButton = ({ reactionType }: ReactionButtonProps) => {
  return (
    <button
      className={clsx(styles.reaction, {
        [styles.love]: reactionType === ReactionType.LOVE,
        [styles.meh]: reactionType === ReactionType.MEH,
        [styles.dislike]: reactionType === ReactionType.DISLIKE,
        [styles.hate]: reactionType === ReactionType.HATE,
      })}
      type="button"
    >
      {reactionIcons[reactionType]}
    </button>
  )
}
