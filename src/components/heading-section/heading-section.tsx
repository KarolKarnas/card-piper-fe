import type { ReactNode } from "react"
import styles from "./heading-section.module.scss"

type Props = {
  children: ReactNode
  color: "blue" | "orange" | "purple"
}
const SectionHeading = ({ color, children }: Props) => {
  return (
    <h4
      className={`${styles.heading} ${color === "orange" && styles.orange} ${
        color === "blue" && styles.blue
      } ${color === "purple" && styles.purple} `}
    >
      {children}
    </h4>
  )
}
export default SectionHeading
