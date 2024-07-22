import { SidebarReactions } from "./sidebar-reactions"
import { SidebarUser } from "./sidebar-user"

import styles from "./sidebar.module.scss"

export const Sidebar = () => {


  return (
    <div className={styles.sidebar}>
      <h2>Sidebar</h2>
      <SidebarUser />
      <SidebarReactions />
    </div>
  )
}
