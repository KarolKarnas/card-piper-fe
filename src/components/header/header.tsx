import clsx from "clsx"
import { useTheme } from "../../hooks/use-theme"
import styles from "./header.module.scss"
import { ThemeSwitcher } from "../switchers/theme-switcher"
import { SignOutSwitcher } from "../switchers/signout-switcher"
import { useAppSelector } from "../../store/hooks"
import { selectUserMe } from "../../store/usersSlice"
import { Logo } from "../logo/logo"

export const Header = () => {
  const dark = useTheme()
  const userMe = useAppSelector(selectUserMe)

  return (
    <div
      className={clsx(styles.header, {
        [styles.dark]: dark,
        [styles.light]: !dark,
      })}
    >
      <Logo />

      <p>
        Hello <strong>{userMe?.email}</strong>, you are{" "}
        <strong>{userMe?.personalityType}</strong>!
      </p>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <SignOutSwitcher />
      </div>
    </div>
  )
}
