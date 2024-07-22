import { useAppSelector } from "../../store/hooks"
import { selectUserMe, selectUserMeRequestState } from "../../store/usersSlice"
import { RequestState } from "../../types"
import styles from "./sidebar-user.module.scss"

export const SidebarUser = () => {
  const userMe = useAppSelector(selectUserMe)
  const userMeRequestState = useAppSelector(selectUserMeRequestState)
  

  const isLoading = userMeRequestState === RequestState.LOADING

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <div className={styles["sidebar-user"]}>
        <h1>USER DETAILS</h1>
        <h2>{userMe?.email}</h2>
        <h2>{userMe?.role}</h2>
        <h3>assertiveTurbulent {userMe?.personality.assertiveTurbulent}</h3>
        <h3>
          extroversionIntroversion{" "}
          {userMe?.personality.extroversionIntroversion}
        </h3>
        <h3>judgingPerceiving {userMe?.personality.judgingPerceiving}</h3>
        <h3>sensingIntuition {userMe?.personality.sensingIntuition}</h3>
        <h3>thinkingFeeling {userMe?.personality.thinkingFeeling}</h3>
      </div>

      <div>
        <h1>LIKES</h1>

        <h2>TOTALS</h2>

        <h3>AUTHORS {userMe?.total_reaction.AUTHOR.TOTAL}</h3>
        <ul>
          <li>LOVE {userMe?.total_reaction.AUTHOR.LOVE}</li>
          <li>
            LIKE {userMe?.total_reaction.AUTHOR.LIKE}{" "}
            {userMe?.latest_reaction.AUTHOR.LIKE.map(reaction => (
              <p>{reaction.author?.name}</p>
            ))}
          </li>
          <li>DISLIKE {userMe?.total_reaction.AUTHOR.DISLIKE}</li>
          <li>HATE {userMe?.total_reaction.AUTHOR.HATE}</li>
        </ul>
        <h3>BOOKS</h3>
        <h3>QUOTES</h3>
        <h3>CHARACTERS {userMe?.total_reaction.CHARACTER.TOTAL}</h3>
        <ul>
          <li>LOVE {userMe?.total_reaction.CHARACTER.LOVE}{" "}
            {userMe?.latest_reaction.CHARACTER.LOVE.map(reaction => (
              <p>{reaction.character?.name}</p>
            ))}</li>
          <li>
            LIKE {userMe?.total_reaction.CHARACTER.LIKE}{" "}
            {userMe?.latest_reaction.CHARACTER.LIKE.map(reaction => (
              <p>{reaction.character?.name}</p>
            ))}
          </li>
          <li>DISLIKE {userMe?.total_reaction.CHARACTER.DISLIKE}{" "}
            {userMe?.latest_reaction.CHARACTER.DISLIKE.map(reaction => (
              <p>{reaction.character?.name}</p>
            ))}</li>
          <li>HATE {userMe?.total_reaction.CHARACTER.HATE}{" "}
            {userMe?.latest_reaction.CHARACTER.HATE.map(reaction => (
              <p>{reaction.character?.name}</p>
            ))}</li>
        </ul>

        <h3>USERS</h3>
      </div>
    </>
  )
}
