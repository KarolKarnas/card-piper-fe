import { useState } from "react"
import FormLogin from "../../components/form-login/form-login"
import { selectUserInfo } from "../../store/authSlice"
import { useAppSelector } from "../../store/hooks"
import { FormLoginRole } from "../../types/entities"
import { Quotes } from "../../components/quotes/Quotes"
import { Personalities } from "../../components/personalities/personalities"
import { Sidebar } from "../../components/sidebar/sidebar"
import styles from "./home.module.scss"
import { Header } from "../../components/header/header"
import { selectUserMe } from "../../store/usersSlice"
import { useFetchUserMe } from "../../hooks/fetch/use-fetch-user-me"

export const Home = () => {
  const [signIn, setSignIn] = useState(true)
  const user = useAppSelector(selectUserInfo)
  const userMe = useAppSelector(selectUserMe)
  useFetchUserMe()
  return (
    <div className={styles.home}>
      <Header />
      {userMe && user ? (
        <div className={styles.main}>
          <Personalities />
          <Sidebar />
        </div>
      ) : (
        <>
          <h1>You need account sir</h1>
          <FormLogin
            role={signIn ? FormLoginRole.SIGNIN : FormLoginRole.SIGNUP}
          />
          <button onClick={() => setSignIn(!signIn)}>
            {signIn ? "I wanna signup" : "i wanna signin"}
          </button>
        </>
      )}
    </div>
  )
}
