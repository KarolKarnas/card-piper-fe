import * as Switch from "@radix-ui/react-switch"
import styles from "./switch-feed.module.scss"
import clsx from "clsx"
import { Entity } from "../../types"

export type SwitchFeedProps = {
  option: Entity
  checked: boolean
  onChange: (value: Entity, checked: boolean) => void
}

export const SwitchFeed = ({ option, checked, onChange }: SwitchFeedProps) => {
  const handleCheckedChange = (newChecked: boolean) => {
    onChange(option, newChecked)
  }

  const isAuthor = option === Entity.AUTHOR
  const isUser = option === Entity.USER
  const isBook = option === Entity.BOOK
  const isQuote = option === Entity.QUOTE
  const isCharacter = option === Entity.CHARACTER

  return (
    <form>
      <div className={styles.switch}>
        <label
          className={clsx(styles.switch__label, {
            [styles["switch__label--author"]]: isAuthor,
            [styles["switch__label--user"]]: isUser,
            [styles["switch__label--book"]]: isBook,
            [styles["switch__label--quote"]]: isQuote,
            [styles["switch__label--character"]]: isCharacter,
          })}
          htmlFor={option}
        >
          {option}
        </label>
        <Switch.Root
          className={clsx(styles.switch__root, {
            [styles["switch__root--author"]]: isAuthor,
            [styles["switch__root--user"]]: isUser,
            [styles["switch__root--book"]]: isBook,
            [styles["switch__root--quote"]]: isQuote,
            [styles["switch__root--character"]]: isCharacter,
          })}
          id={option}
          checked={checked}
          onCheckedChange={handleCheckedChange}
        >
          <Switch.Thumb className={styles.switch__thumb} />
        </Switch.Root>
      </div>
    </form>
  )
}
