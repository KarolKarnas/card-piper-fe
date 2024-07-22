import { Link } from "react-router-dom"
import styles from "./button.module.scss"
import type { SyntheticEvent } from "react"

type Props = {
  text: string
  color: "blue" | "orange" | "pink"
  path?: string
}

const logText = (e: SyntheticEvent) => {
  // console.log("button")
  e.stopPropagation()
}

const Button = ({ text, color, path }: Props) => {
  return (
    <button
      className={`${styles.button} ${color === "orange" && styles.orange} ${
        color === "blue" && styles.blue
      } ${color === "pink" && styles.pink} `}
      onClick={e => logText(e)}
    >
      {path ? <Link to={path}>{text}</Link> : <span>{text}</span>}
    </button>
  )
}
export default Button
