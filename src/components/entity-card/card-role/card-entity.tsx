import { Entity } from "../../../types"
import clsx from "clsx"
import styles from "./card-entity.module.scss"

export type CardEntityProps = {
  entity: Entity
}

export const CardEntity = ({ entity }: CardEntityProps) => {
  const isAuthor = entity === Entity.AUTHOR
  const isUser = entity === Entity.USER
  const isBook = entity === Entity.BOOK
  const isQuote = entity === Entity.QUOTE
  const isCharacter = entity === Entity.CHARACTER

  return (
    <span
      className={clsx(styles.entity, {
        [styles["entity--author"]]: isAuthor,
        [styles["entity--user"]]: isUser,
        [styles["entity--book"]]: isBook,
        [styles["entity--quote"]]: isQuote,
        [styles["entity--character"]]: isCharacter,
      })}
    >
      {Entity[entity]}
    </span>
  )
}
