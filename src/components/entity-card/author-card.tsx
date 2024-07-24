import React from "react"
import styles from "./author-card.module.scss"
import { useTheme } from "../../hooks/use-theme"
import clsx from "clsx"
import { createReactionArgs } from "../../utils/functions"
import { useCreateReaction } from "../../hooks/use-create-reaction"
import { useUserMe } from "../../hooks/use-user-me"
import type { SyntheticEvent } from "react"
import type { Author } from "../../types"
import { Entity, ReactionType } from "../../types"

export type AuthorCardProps = {
  author: Author
  distance: number
}

export const AuthorCard = ({ author, distance }: AuthorCardProps) => {
  const { handleCreateReaction } = useCreateReaction()
  const userMe = useUserMe()
  const dark = useTheme()

  const isLoading = !userMe

  if (isLoading) {
    return <div>LOADING</div>
  }

  const handleClick = (e: SyntheticEvent, type: ReactionType) => {
    e.stopPropagation()
    const args = createReactionArgs(userMe.id, Entity.AUTHOR, type, author.id)
    handleCreateReaction(args)
  }

  const changeDirectory = (email: string) => {
    console.log(email)
  }

  return (
    <div
      className={clsx(styles.card, {
        [styles.dark]: dark,
        [styles.light]: !dark,
      })}
      onClick={() => {
        changeDirectory(author.name)
      }}
    >
      <div
        className={clsx(styles["content-container"], {
          [styles.dark]: dark,
          [styles.light]: !dark,
        })}
      >
        <h2>AUTHOR</h2>
        <h3>distance {distance}</h3>
        <h3>{author.name}</h3>
        <h3 dangerouslySetInnerHTML={{ __html: author.bio }}></h3>

        <h4>TITLE</h4>
        <p>CONTENT</p>
        <h2>REACTIONS</h2>
        {author.reactions.length > 0 &&
         author.reactions.map((reaction, index) => (
            <h3 key={index}>
              {reaction.type} by {reaction.user?.email}
            </h3>
          ))}
        {Object.values(ReactionType).map(type => (
          <button key={type} onClick={e => handleClick(e, type)}>
            {type}
          </button>
        ))}
      </div>
    </div>
  )
}
