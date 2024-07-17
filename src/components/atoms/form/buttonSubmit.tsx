import Link from "next/link"
import styles from "./buttonSubmit.module.scss"

type Props = {
  text: string
  color: "blue" | "orange"
  type: "submit" | "button"
}
const ButtonSubmit = ({ text, color, type }: Props) => {
  return (
    <button type="submit"
      className={`${styles.button} ${color === "orange" && styles.orange} ${
        color === "blue" && styles.blue
      } `}
    >
      {text}
    </button>
  )
}
export default ButtonSubmit
