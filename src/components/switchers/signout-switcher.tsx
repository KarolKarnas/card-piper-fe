import { FaSignOutAlt } from "react-icons/fa"
import styles from "./theme-switcher.module.scss"
import { useSignout } from "../../hooks/use-signout"

export const SignOutSwitcher = () => {
  const { handleSignout } = useSignout()

  return (
    <button
      className={styles.switcher}
      type="button"
      aria-expanded="false"
      onClick={() => handleSignout()}
    >
      {<FaSignOutAlt />}
    </button>
  )
}
