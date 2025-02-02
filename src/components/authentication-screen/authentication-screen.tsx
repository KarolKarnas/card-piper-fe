import { useState } from "react"
import FormLogin from "../form-login/form-login"
import styles from "./authentication-screen.module.scss"
import { FormLoginRole } from "../../types"
import { ContentWrapper } from "../content-wrapper/content-wrapper"

export const AuthenticationScreen = () => {
  const [signIn, setSignIn] = useState(true)
  const role = signIn ? FormLoginRole.SIGNIN : FormLoginRole.SIGNUP

  return (
    <ContentWrapper>
      <div className={styles.authentication}>
        <h1 className={styles.authentication__heading}>CARD PIPER</h1>
        <div className={styles.authentication__about}>
          <ul>
            <li>
              <strong>Card Piper</strong> is place where you can track your
              relation with the whole world of culture.
            </li>
            <li>
              Love, Like, Meh, Dislike and Hate{" "}
              <strong>Authors, Books, Quotes, Characters </strong> and even
              other <strong>Users</strong>.
            </li>
            <li>
              Your reactions to those will let us judge your{" "}
              <strong>16 personality </strong>profile!
            </li>
            <li>
              Every of your reactions to any card will immediately update your
              personality and your feed.
            </li>
            <li>
              This will also <strong>update your feed</strong> to present you
              the card that you probably will <strong>like the most</strong>.
            </li>
            <li>
              We are working on implementations of new branches from the world
              of culture to make this place complete.
            </li>
          </ul>
        </div>
        <div className={styles.authentication__form}>
          <h2 className={styles["authentication__form-title"]}>{role}</h2>
          <FormLogin role={role} />
          <div className={styles["authentication__form-txt"]}>
            <p>I don't have an account</p>
            <p
              onClick={() => setSignIn(!signIn)}
              className={styles["authentication__form-txt--cta"]}
            >
              {signIn ? "I wanna signup" : "I wanna signin"}
            </p>
          </div>

          <div className={styles["authentication__form-txt--secret"]}>
            <p>Or use this secret credentials:</p>{" "}
            <p>login: guest@guest.com</p>
            <p>password: guest</p>
          </div>
        </div>
        <div className={styles.authentication__quote}>
          "What makes the desert beautiful is that somewhere it hides a well."
          <span className={styles["authentication__quote-author"]}>
            Antoine de Saint-Exupéry
          </span>
        </div>
      </div>
    </ContentWrapper>
  )
}
