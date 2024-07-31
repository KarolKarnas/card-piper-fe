import { useAppSelector } from "../../store/hooks"
import { selectUserMe } from "../../store/usersSlice"
import { ReactionMainAccordion } from "../reaction-main-accordion/reaction-main-accordion"
import styles from "./sidebar-reactions.module.scss"

export const SidebarReactions = () => {
  // const userMe = useAppSelector(selectUserMe)

  return (
    <div>
      {/* <h1>LIKES</h1> */}
      <ReactionMainAccordion />

      {/* <h2>TOTALS</h2>

      <h3>AUTHORS {userMe?.total_reaction.AUTHOR.TOTAL}</h3>
      <ul>
        <li>LOVE {userMe?.total_reaction.AUTHOR.LOVE}</li>
        <li>
          LIKE {userMe?.total_reaction.AUTHOR.LIKE}{" "}
          {userMe?.latest_reaction.AUTHOR.LIKE.map((reaction, index) => (
            <p key={index}>{reaction.author?.name}</p>
          ))}
        </li>
        <li>DISLIKE {userMe?.total_reaction.AUTHOR.DISLIKE}</li>
        <li>HATE {userMe?.total_reaction.AUTHOR.HATE}</li>
      </ul>
      <h3>BOOKS</h3>
      <h3>QUOTES</h3>
      <h3>CHARACTERS {userMe?.total_reaction.CHARACTER.TOTAL}</h3>
      <ul>
        <li>
          LOVE {userMe?.total_reaction.CHARACTER.LOVE}{" "}
          {userMe?.latest_reaction.CHARACTER.LOVE.map((reaction, index) => (
            <p key={index}>{reaction.character?.name}</p>
          ))}
        </li>
        <li>
          LIKE {userMe?.total_reaction.CHARACTER.LIKE}{" "}
          {userMe?.latest_reaction.CHARACTER.LIKE.map((reaction, index) => (
            <p key={index}>{reaction.character?.name}</p>
          ))}
        </li>
        <li>
          DISLIKE {userMe?.total_reaction.CHARACTER.DISLIKE}{" "}
          {userMe?.latest_reaction.CHARACTER.DISLIKE.map((reaction, index) => (
            <p key={index}>{reaction.character?.name}</p>
          ))}
        </li>
        <li>
          HATE {userMe?.total_reaction.CHARACTER.HATE}{" "}
          {userMe?.latest_reaction.CHARACTER.HATE.map((reaction, index) => (
            <p key={index}>{reaction.character?.name}</p>
          ))}
        </li>
      </ul>

      <h3>USERS</h3> */}
    </div>
  )
}
