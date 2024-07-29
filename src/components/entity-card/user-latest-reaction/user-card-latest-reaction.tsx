import { Entity, type Reaction } from "../../../types"
import { ReactionButton } from "../../reaction-button/reaction-button"

export type UserLatestReactionProps = {
  reactions: Reaction[]
}

export const UserLatestReaction = ({ reactions }: UserLatestReactionProps) => {
  return reactions.map((reaction, index) => {
    return reaction.entity === Entity.CHARACTER ? (
      <p key={index}>
        {reaction.character?.name}
        <ReactionButton reaction={reaction} />
      </p>
    ) : reaction.entity === Entity.USER ? (
      <p key={index}>
        {reaction.reactedUser?.email} <ReactionButton reaction={reaction} />
      </p>
    ) : reaction.entity === Entity.AUTHOR ? (
      <p key={index}>
        {reaction.author?.name} <ReactionButton reaction={reaction} />
      </p>
    ) : reaction.entity === Entity.BOOK ? (
      <p key={index}>
        {reaction.book?.title} <ReactionButton reaction={reaction} />
      </p>
    ) : reaction.entity === Entity.QUOTE ? (
      <p key={index}>
        {reaction.quote?.text} <ReactionButton reaction={reaction} />
      </p>
    ) : null
  })
}
