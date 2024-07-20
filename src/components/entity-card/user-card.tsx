import styles from "./user-card.module.scss"
import Button from "../button/button"
import type { User } from "../../types"

export type UserCardProps = {
  user: User
  distance: number
}

export const UserCard = ({ user, distance }: UserCardProps) => {
  // const router = useRouter()

  // console.log("user ", user.reactedBy)

  const changeDirectory = (email: string) => {
    // router.push(path)
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
        {/* <div className={styles["date-container"]}>
          <span>Karol Karnas</span>
          <span>{new Date(card.date).toLocaleDateString("en-GB")}</span>
        </div> */}
        <h2>USER</h2>
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
          user.reactedBy.map(reaction => (
            <p>
              {reaction.type} by {reaction.user?.email}
            </p>
          ))}

        {/* <p>{card.content}</p> */}
        <Button text="Read more" color="orange" path={"some-path"} />
      </div>
      {/* <Image
        src={card.main_image}
        width={1920}
        height={1080}
        alt={card.title}
      /> */}

      {/* <div className={styles["content-container"]}>

        <h4>TITLE</h4>
        <p>CONTENT</p>
        <Button text="Read more" color="orange" path={'some-path'} />
      </div> */}
    </div>
  )
}
