import styles from "./user-card.module.scss"
import type { Reaction , Entity} from "../../types"
import {  type User } from "../../types"
import { useTheme } from "../../hooks/use-theme"
import clsx from "clsx"
import { useUserMe } from "../../hooks/use-user-me"
import { CardEntity } from "./card-role/card-entity"
import ReactionButtons from "../reaction-buttons/reaction-buttons"

export type UserCardProps = {
  personalityId: number
  user: User
  distance: number
  entity: Entity
}

export const UserCard = ({
  personalityId,
  user,
  entity,
  distance,
}: UserCardProps) => {
  const dark = useTheme()
  const userMe = useUserMe()
  const isLoading = !userMe

  const changeDirectory = (email: string) => {
    console.log(email)
  }

  if (isLoading) {
    return <div>LOADING</div>
  }

  const renderLatestReaction = (reactions: Reaction[]) => {
    return reactions.map((reaction, index) => (
      <p key={index}>{reaction.entity}</p>
    ))
  }

 
  return (
    <div
      className={clsx(styles.card, {
        [styles.dark]: dark,
        [styles.light]: !dark,
      })}
      onClick={() => {
        changeDirectory(user.email)
      }}
    >
      <div
        className={clsx(styles["content-container"], {
          [styles.dark]: dark,
          [styles.light]: !dark,
        })}
      >
        <CardEntity entity={entity} />
        <h2>{user.email}</h2>
        {user.reactions && renderLatestReaction(user.reactions)}
        <h3>distance {distance}</h3>
        <h3>{user.email}</h3>
        <h3>assertiveTurbulent {user.personality.assertiveTurbulent}</h3>
        <h3>
          extroversionIntroversion {user.personality.extroversionIntroversion}
        </h3>
        <h3>judgingPerceiving {user.personality.judgingPerceiving}</h3>
        <h3>sensingIntuition {user.personality.sensingIntuition}</h3>
        <h3>thinkingFeeling {user.personality.thinkingFeeling}</h3>

        <h4>TITLE</h4>
        <p>CONTENT</p>
        <h2>REACTIONS</h2>
        {user.reactedBy &&
          user.reactedBy.length > 0 &&
          user.reactedBy.map((reaction, index) => (
            <h3 key={index}>
              {reaction.type} by {reaction.user?.email}
            </h3>
          ))}
        <ReactionButtons
          entity={entity}
          personalityId={personalityId}
          targetId={user.id}
        />
      </div>
    </div>
  )
}
