import type { SyntheticEvent } from "react"
import styles from "./reaction-buttons.module.scss"
import { FaHeart, FaThumbsDown, FaThumbsUp } from "react-icons/fa6"
import { FaAngry } from "react-icons/fa"
import type { Entity } from "../../types"
import { ReactionType } from "../../types"
import { useCreatePersonalityReaction } from "../../hooks/use-create-personality-reaction"
import { useUserMe } from "../../hooks/use-user-me"
import { createReactionArgs } from "../../utils/functions"
import clsx from "clsx"

interface ReactionButtonsProps {
  personalityId: number
  targetId: number
  entity: Entity
}

const reactionIcons = {
  [ReactionType.LOVE]: <FaHeart />,
  [ReactionType.LIKE]: <FaThumbsUp />,
  [ReactionType.DISLIKE]: <FaThumbsDown />,
  [ReactionType.HATE]: <FaAngry />,
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({
  personalityId,
  targetId,
  entity,
}) => {
  const { handleCreatePersonalityReaction } = useCreatePersonalityReaction()
  const userMe = useUserMe()

  const handleClick = (e: SyntheticEvent, type: ReactionType) => {
    e.stopPropagation()
    if (userMe) {
      const args = createReactionArgs(userMe.id, entity, type, targetId)
      handleCreatePersonalityReaction({
        id: personalityId,
        createReaction: args,
      })
    }
  }

  return (
    <div className={styles.reaction}>
      {Object.values(ReactionType).map(type => (
        <button
          className={clsx({
            [styles.hate]: type === ReactionType.HATE,
            [styles.love]: type === ReactionType.LOVE,
            [styles.dislike]: type === ReactionType.DISLIKE,
          })}
          type="button"
          key={type}
          onClick={e => handleClick(e, type)}
        >
          {reactionIcons[type]}
        </button>
      ))}
    </div>
  )
}

export default ReactionButtons
