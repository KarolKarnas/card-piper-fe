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
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const user = useAppSelector(selectUserInfo)
  useFetchUserMe()
  const userMe = useAppSelector(selectUserMe)

  const dark = useTheme()

  return (
    <div className={styles.App}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={userMe ? (dark ? "dark" : "light") : "dark"}
      />
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
