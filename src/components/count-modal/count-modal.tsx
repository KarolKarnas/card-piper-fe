import type { SyntheticEvent } from "react"
import { useEffect, useRef } from "react"
import styles from "./count-modal.module.scss"

interface CountModalProps {
  isOpen: boolean
  onClose: (e: SyntheticEvent) => void
  children: React.ReactNode
}

export const CountModal = ({ isOpen, onClose, children }: CountModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [isOpen])

  const handleClickOutside = (e: SyntheticEvent) => {
    if (e.target === dialogRef.current) {
      console.log(e.target)
    } else {
      onClose(e)
    }
  }

  return (
    <dialog
      className={styles.modal}
      ref={dialogRef}
      onClose={onClose}
      onClick={handleClickOutside}
    >
      <div className={styles.modalContent}>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </dialog>
  )
}
