import { useState, type SyntheticEvent } from "react"
import styles from "./reaction-buttons.module.scss"
import { FaHeart, FaThumbsDown, FaThumbsUp } from "react-icons/fa6"
import { FaMeh, FaHeartBroken } from "react-icons/fa"
import type { Entity, Reaction } from "../../types"
import { ReactionType } from "../../types"
import { useCreatePersonalityReaction } from "../../hooks/use-create-personality-reaction"
import { useUserMe } from "../../hooks/use-user-me"
import { createReactionArgs } from "../../utils/functions"
import clsx from "clsx"
import { CountModal } from "../count-modal/count-modal"

interface ReactionButtonsProps {
  personalityId: number
  targetId: number
  entity: Entity
  reactions: Reaction[]
  personalityName: string
}

export const reactionIcons = {
  [ReactionType.LOVE]: <FaHeart />,
  [ReactionType.LIKE]: <FaThumbsUp />,
  [ReactionType.MEH]: <FaMeh />,
  [ReactionType.DISLIKE]: <FaThumbsDown />,
  [ReactionType.HATE]: <FaHeartBroken />,
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({
  personalityId,
  targetId,
  entity,
  reactions,
  personalityName,
}) => {
  const { handleCreatePersonalityReaction } = useCreatePersonalityReaction()
  const userMe = useUserMe()
  const [isModalOpen, setModalOpen] = useState(false)

  const handleClickReaction = (e: SyntheticEvent, type: ReactionType) => {
    e.stopPropagation()
    if (userMe) {
      const args = createReactionArgs(userMe.id, entity, type, targetId)
      handleCreatePersonalityReaction({
        id: personalityId,
        createReaction: args,
      })
    }
  }
  const handleClickCount = (e: SyntheticEvent) => {
    e.stopPropagation()
    setModalOpen(true)
  }

  const handleCloseModal = (e: SyntheticEvent) => {
    e.stopPropagation()
    setModalOpen(false)
  }

  return (
    <div className={styles.reactions}>
      {Object.values(ReactionType).map(type => (
        <button
          className={clsx(styles.reaction, {
            [styles.love]: type === ReactionType.LOVE,
            [styles.meh]: type === ReactionType.MEH,
            [styles.dislike]: type === ReactionType.DISLIKE,
            [styles.hate]: type === ReactionType.HATE,
          })}
          type="button"
          key={type}
          onClick={e => handleClickReaction(e, type)}
        >
          {reactionIcons[type]}
        </button>
      ))}
      <button className={styles.count} onClick={e => handleClickCount(e)}>
        {reactions ? reactions.length : 0}
      </button>
      <CountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        reactions={reactions}
        personalityName={personalityName}
      ></CountModal>
    </div>
  )
}

export default ReactionButtons
