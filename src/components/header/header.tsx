import clsx from "clsx"
import { useTheme } from "../../hooks/use-theme"
import styles from "./header.module.scss"

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
    </div>
  )
}
