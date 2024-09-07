import { useState } from "react"
import FormLogin from "../form-login/form-login"
import { Logo } from "../logo/logo"
import styles from "./authentication-screen.module.scss"
import { FormLoginRole } from "../../types"

export const AuthenticationScreen = () => {
  const [signIn, setSignIn] = useState(true)

  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <Logo />
        <ul>
          <li>
            <strong>Card Piper</strong> is place where you can track your
            relation with the whole world of culture
          </li>
          <li>
            Love, Like, Meh, Dislike and Hate Authors, Books, Quotes, Characters
            and even other Users
          </li>
          <li>
            Your reactions to those will let us judge your 16 personality
            profile!
          </li>
          <li>
            Every of your reactions to any card will immediately update your
            personality and your feed
          </li>
          <li>
            This will also update your feed to present you the card tha you
            probably will like the most
          </li>
          <li>
            We are working on implementations of new branches from the world of
            culture to make this place complete
          </li>
        </ul>
      </div>
      <div className={styles.form}>
        <FormLogin
          role={signIn ? FormLoginRole.SIGNIN : FormLoginRole.SIGNUP}
        />

        <button onClick={() => setSignIn(!signIn)}>
          {signIn ? "I wanna signup" : "i wanna signin"}
        </button>
      </div>
    </div>
  )
}
