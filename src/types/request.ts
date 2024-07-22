import type { Entity, ReactionType } from "./entities"
import type { PersonalityStats } from "./entities"

export enum RequestState {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type QuotesRequestParams = {
  skip: number
  take: number
  userPersonality: PersonalityStats | null
}

export type PersonalityRequestParams = {
  skip: number
  take: number
  userPersonality: PersonalityStats | null
  entity: Entity
  entities: Entity[]
}

// export type ReactionsRequestParams = {
//   userId: number
//   all?: boolean
//   type?: ReactionType
//   entity?: Entity
//   favorite?: string
//   list?: string
// }

export type SignupRequestParams = {
  email: string
  password: string
}
export type SigninRequestParams = {
  email: string
  password: string
}

export type CreateReactionRequest = {
  userId: number
  quoteId?: number
  bookId?: number
  authorId?: number
  characterId?: number
  reactedUserId?: number
  type: ReactionType
  entity: Entity
  favorite: boolean
  list: boolean
}
