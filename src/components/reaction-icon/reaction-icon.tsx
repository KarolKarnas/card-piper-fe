import { ReactionType } from "../../types"
import styles from "./reaction-icon.module.scss"
import clsx from "clsx"
import { reactionIcons } from "../reaction-buttons/reaction-buttons"

export type ReactionIconProps = {
  reactionType: ReactionType
}

export const ReactionIcon = ({ reactionType }: ReactionIconProps) => {
  return (
    <span
      className={clsx(styles.reaction, {
        [styles.love]: reactionType === ReactionType.LOVE,
        [styles.like]: reactionType === ReactionType.LIKE,
        [styles.meh]: reactionType === ReactionType.MEH,
        [styles.dislike]: reactionType === ReactionType.DISLIKE,
        [styles.hate]: reactionType === ReactionType.HATE,
      })}
    >
      {reactionIcons[reactionType]}
    </span>
  )
}
