import clsx from "clsx"
import { useTheme } from "../../hooks/use-theme"
import styles from "./header.module.scss"
import { ThemeSwitcher } from "../switchers/theme-switcher"
import { SignOutSwitcher } from "../switchers/signout-switcher"
import { useAppSelector } from "../../store/hooks"
import { selectUserMe } from "../../store/usersSlice"
import { Logo } from "../logo/logo"

export const MINIMUM_REACTION_NUM = 3

export const Header = () => {
  const dark = useTheme()
  const userMe = useAppSelector(selectUserMe)

  if (!userMe) {
    return <div>Loading...</div>
  }
  const totalReactions = userMe.total_reaction_num

  return (
    <div
      className={clsx(styles.header, {
        [styles.dark]: dark,
        [styles.light]: !dark,
      })}
    >
      <Logo />
      <p className={styles.header__info}>
        Hello <strong>{userMe.email}</strong>
        {totalReactions < MINIMUM_REACTION_NUM
          ? `, you need to react to ${MINIMUM_REACTION_NUM - totalReactions} more`
          : `, you are `}
        {totalReactions >= MINIMUM_REACTION_NUM && (
          <strong>{userMe.personalityType}</strong>
        )}
        !
      </p>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <SignOutSwitcher />
      </div>
    </div>
  )
}
