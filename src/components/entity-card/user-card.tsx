import styles from "./user-card.module.scss"
import Button from "../button/button"
import type { User } from "../../types"

export type UserCardProps = {
  user: User
  distance: number
}

export const UserCard = ({ user, distance }: UserCardProps) => {

  console.log(user)

  const changeDirectory = (email: string) => {
    console.log(email)
  }
  return (
    <div
      className={styles.card}
      onClick={() => {
        changeDirectory(user.email)
      }}
    >
      <div className={styles["content-container"]}>
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
            <p key={index}>
              {reaction.type} by {reaction.user?.email}
            </p>
          ))}
        <Button text="Read more" color="orange" path={"some-path"} />
      </div>
    </div>
  )
}
