import clsx from "clsx"
import { useTheme } from "../../hooks/use-theme"
import { SidebarReactions } from "./sidebar-reactions"
import styles from "./sidebar.module.scss"

export const Sidebar = () => {
  const dark = useTheme()

  return (
    <div
      className={clsx(styles.sidebar, {
        [styles.dark]: dark,
        [styles.light]: !dark,
      })}
    >
      <SidebarReactions />
    </div>
  )
}
