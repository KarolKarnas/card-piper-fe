import clsx from "clsx"
import { useTheme } from "../../hooks/use-theme"
import styles from "./header.module.scss"
import { ThemeSwitcher } from "../switchers/theme-switcher"
import { SignOutSwitcher } from "../switchers/signout-switcher"

export const Header = () => {
  const dark = useTheme()
  return (
    <div
      className={clsx(styles.header, {
        [styles.dark]: dark,
        [styles.light]: !dark,
      })}
    >
      <div className={styles.logo}>
        {/* <img src="/public/images/logo.jpg" alt="logo" /> */}
        <span>card hamster</span>
      </div>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <SignOutSwitcher />
      </div>
    </div>
  )
}
