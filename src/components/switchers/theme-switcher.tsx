import { FaMoon, FaSun } from "react-icons/fa6"
import { useTheme } from "../../hooks/use-theme"
import { useUpdateUserMe } from "../../hooks/use-update-user-me"
import styles from "./theme-switcher.module.scss"

export const ThemeSwitcher = () => {
  const dark = useTheme()
  const { handleUpdateUserMe } = useUpdateUserMe()

  return (
    <button
      className={styles.switcher}
      type="button"
      aria-expanded="false"
      onClick={() => handleUpdateUserMe({ darkTheme: !dark })}
    >
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  )
}
