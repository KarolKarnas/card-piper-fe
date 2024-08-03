import type { SyntheticEvent } from "react"
import { useEffect, useRef } from "react"
import styles from "./count-modal.module.scss"
import type { Reaction } from "../../types"
import { ReactionIcon } from "../reaction-icon/reaction-icon"

interface CountModalProps {
  isOpen: boolean
  onClose: (e: SyntheticEvent) => void
  reactions?: Reaction[]
  personalityName: string
}

export const CountModal = ({
  isOpen,
  onClose,
  reactions,
  personalityName,
}: CountModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [isOpen])

  const handleClickOutside = (e: SyntheticEvent) => {
    onClose(e)
  }

  return (
    <dialog
      className={styles.modal}
      ref={dialogRef}
      onClose={onClose}
      onClick={handleClickOutside}
    >
      <span className={styles.reactions}>{personalityName} is:</span>
      <ul>
        {reactions &&
          reactions.map((reaction, index) => {
            return (
              <li key={index}>
                {" "}
                <ReactionIcon reactionType={reaction.type} />
                {` ${reaction.type.toLocaleLowerCase()} by `}
                {reaction.user?.email}
              </li>
            )
          })}
      </ul>
    </dialog>
  )
}
