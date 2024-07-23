import { useAppSelector } from "../../store/hooks"
import { selectUserMe } from "../../store/usersSlice"
import styles from "./sidebar-user.module.scss"

export const SidebarUser = () => {
  const userMe = useAppSelector(selectUserMe)
  const dark = userMe?.darkTheme
  console.log(dark)
  return (
      <div className={styles["sidebar-user"]}>
        <h1>USER DETAILS</h1>
        <p>Are you fear of the dark? <strong>{!dark ? 'Yes' : 'No'}</strong></p>
        <h2>{userMe?.email}</h2>
        <h2>{userMe?.role}</h2>
        <h1>{userMe?.personalityType}</h1>
        <h3>assertiveTurbulent {userMe?.personality.assertiveTurbulent}</h3>
        <h3>
          extroversionIntroversion{" "}
          {userMe?.personality.extroversionIntroversion}
        </h3>
        <h3>judgingPerceiving {userMe?.personality.judgingPerceiving}</h3>
        <h3>sensingIntuition {userMe?.personality.sensingIntuition}</h3>
        <h3>thinkingFeeling {userMe?.personality.thinkingFeeling}</h3>
      </div>


  )
}
