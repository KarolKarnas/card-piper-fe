import React from "react"
import clsx from "clsx"
import { Personalities } from "../../components/personalities/personalities"
import { Sidebar } from "../../components/sidebar/sidebar"
import styles from "./home.module.scss"

export const Home = () => {
  const darkTheme = true // Replace this with the actual theme state

  return (
    <div className={styles.home}>
      <div className={styles.main}>
        <Personalities />
        <Sidebar />
      </div>
    </div>
  )
}
