import type { ReactNode } from "react"
import styles from "./content-wrapper.module.scss"

export type ContentWrapperProps = {
  children: ReactNode
}

export const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <div className={styles["content-wrapper"]}>
      <div className={styles["content-wrapper__left-up"]} />
      <div className={styles["content-wrapper__left-down"]} />
      <div className={styles["content-wrapper__right"]} />
      {children}
    </div>
  )
}
