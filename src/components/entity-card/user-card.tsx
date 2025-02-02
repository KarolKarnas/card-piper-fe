import styles from "./user-card.module.scss"
import type { Entity } from "../../types"
import { type User } from "../../types"
import { useTheme } from "../../hooks/use-theme"
import clsx from "clsx"
import { useUserMe } from "../../hooks/use-user-me"
import { CardEntity } from "./card-role/card-entity"
import ReactionButtons from "../reaction-buttons/reaction-buttons"
import { UserLatestReaction } from "./user-latest-reaction/user-card-latest-reaction"

export type UserCardProps = {
  personalityId: number
  user: User
  entity: Entity
}

export const UserCard = ({ personalityId, user, entity }: UserCardProps) => {
  const dark = useTheme()
  const userMe = useUserMe()
  const isLoading = !userMe

  if (isLoading) {
    return <div>LOADING</div>
  }

  return (
    <div
      className={clsx(styles.card, {
        [styles.dark]: dark,
        [styles.light]: !dark,
      })}
    >
      <div
        className={clsx(styles["content-container"], {
          [styles.dark]: dark,
          [styles.light]: !dark,
        })}
      >
        <CardEntity entity={entity} />
        <h2>{user.email}</h2>

        {user.reactions && (
          <UserLatestReaction reactions={user.reactions} email={user.email} />
        )}
        <ReactionButtons
          entity={entity}
          personalityId={personalityId}
          targetId={user.id}
          reactions={user.reactedBy}
          personalityName={user.email}
        />
      </div>
    </div>
  )
}
