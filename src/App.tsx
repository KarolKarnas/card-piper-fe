import { Outlet } from "react-router-dom"
import styles from "./App.module.scss"
import logo from "./logo.svg"
import { Header } from "./components/header/header"
import { useAppSelector } from "./store/hooks"
import { selectUserInfo } from "./store/authSlice"
import { selectUserMe } from "./store/usersSlice"
import { useFetchUserMe } from "./hooks/fetch/use-fetch-user-me"
import clsx from "clsx"
import { useTheme } from "./hooks/use-theme"
import { AuthenticationScreen } from "./components/authentication-screen/authentication-screen"

const App = () => {
  const user = useAppSelector(selectUserInfo)
  useFetchUserMe()
  const userMe = useAppSelector(selectUserMe)

  const dark = useTheme()

  return (
    <div className={styles.App}>
      {userMe && user ? (
        <div className={clsx(dark ? styles.dark : styles.light)}>
          <Header />
          <Outlet />
        </div>
      ) : (
        <AuthenticationScreen />
      )}
    </div>
  )
}

export default App
