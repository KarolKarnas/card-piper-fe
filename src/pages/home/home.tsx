
import { Personalities } from "../../components/personalities/personalities"
import { Sidebar } from "../../components/sidebar/sidebar"
import styles from "./home.module.scss"

export const Home = () => {

  return (
    <div className={styles.home}>
      <div className={styles.main}>
        <Personalities />
        <Sidebar />
      </div>
    </div>
  )
}
