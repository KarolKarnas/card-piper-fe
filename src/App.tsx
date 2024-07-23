import { Outlet } from "react-router-dom"
import styles from "./App.module.scss"
// import { Quotes } from "./components/quotes/Quotes"
import logo from "./logo.svg"
import { Header } from "./components/header/header"
import { useState } from "react"
import { useAppSelector } from "./store/hooks"
import { selectUserInfo } from "./store/authSlice"
import { selectUserMe } from "./store/usersSlice"
import { useFetchUserMe } from "./hooks/fetch/use-fetch-user-me"
import FormLogin from "./components/form-login/form-login"
import { FormLoginRole } from "./types"
import clsx from "clsx"
import { useTheme } from "./hooks/use-theme"

const App = () => {
  const [signIn, setSignIn] = useState(true)
  const user = useAppSelector(selectUserInfo)
  const userMe = useAppSelector(selectUserMe)
  useFetchUserMe()

  const darkTheme = useTheme()

  return (
    <div className={styles.App}>
      {userMe && user ? (
        <div className={clsx(darkTheme ? styles.dark : styles.light)}>
          <Header />
          <Outlet />
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

export default App
