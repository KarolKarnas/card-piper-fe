import styles from "./header.module.scss"

export const Header = () => {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src="/public/images/logo.jpg" alt="logo" />
      header
    </div>
  )
}
