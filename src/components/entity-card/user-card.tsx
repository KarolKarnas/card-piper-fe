import styles from "./user-card.module.scss"
import Button from "../button/button"
import { Entity, ReactionType, type User } from "../../types"
import { useTheme } from "../../hooks/use-theme"
import clsx from "clsx"
import { createReactionArgs } from "../../utils/functions"
import { useUserMe } from "../../hooks/use-user-me"
import type { SyntheticEvent } from "react"
import { useCreatePersonalityReaction } from "../../hooks/use-create-personality-reaction"

export type UserCardProps = {
  personalityId: number
  user: User
  distance: number
}

export const UserCard = ({ personalityId, user, distance }: UserCardProps) => {
  const { handleCreatePersonalityReaction } = useCreatePersonalityReaction()
  const dark = useTheme()
  const userMe = useUserMe()
  const isLoading = !userMe

  console.log(user)

  const changeDirectory = (email: string) => {
    console.log(email)
  }

  if (isLoading) {
    return <div>LOADING</div>
  }

  const handleClick = (e: SyntheticEvent, type: ReactionType) => {
    e.stopPropagation()
    const args = createReactionArgs(userMe.id, Entity.USER, type, user.id)
    handleCreatePersonalityReaction({
      id: personalityId,
      createReaction: args,
    })
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
        <h2>USER</h2>
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
        {user.reactedBy.length > 0 &&
          user.reactedBy.map((reaction, index) => (
            <h3 key={index}>
              {reaction.type} by {reaction.user?.email}
            </h3>
          ))}
        {Object.values(ReactionType).map(type => (
          <button key={type} onClick={e => handleClick(e, type)}>
            {type}
          </button>
        ))}
      </div>
    </div>
  )
}
