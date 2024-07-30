import { Entity } from "../../../types"
import styles from "./card-entity.module.scss"

export type CardEntityProps = {
  entity: Entity
}

export const CardEntity = ({ entity }: CardEntityProps) => {
  return <span className={styles.entity}>{Entity[entity]}</span>
}
