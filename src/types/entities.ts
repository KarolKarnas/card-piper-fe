// USER

export type PersonalityStats = {
  assertiveTurbulent: number
  extroversionIntroversion: number
  judgingPerceiving: number
  sensingIntuition: number
  thinkingFeeling: number
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface UserInfo {
  access_token: string
}

export type UserMe = {
  id: number
  email: string
  role: UserRole
  firstName: string | null
  lastName: string | null
  personality: PersonalityStats
  total_reaction: TotalReaction
  latest_reaction: LatestReaction
  personalityType: string
  darkTheme: boolean
}

export enum FormLoginRole {
  SIGNIN = "SIGNIN",
  SIGNUP = "SIGNUP",
}

// AUTHOR

export type Author = {
  id: number
  name: string
  bio: string
  books: Book[]
  reactions: Reaction[]
}

// BOOK

export type Book = {
  id: number
  title: string
  author: Author
  characters: Character[]
  reactions: Reaction[]
}

// QUOTE

export type Quote = {
  id: number
  createdAt: string
  updatedAt: string
  author: Author
  text: string
  origin: string
  popularity: number
  tags: string[]
  distance: number
  reactions: Reaction[]
}

// CHARACTER

export type Character = {
  id: number
  name: string
  books: Book[]
  reactions: Reaction[]
}

// USER

export type User = {
  id: number
  email: string
  personality: PersonalityStats
  reactedBy: Reaction[]
  reactions: Reaction[]
}

export type UserReacted = {
  id: number
  email: string
}

// ENTITY

export enum Entity {
  AUTHOR = "AUTHOR",
  BOOK = "BOOK",
  QUOTE = "QUOTE",
  CHARACTER = "CHARACTER",
  USER = "USER",
}

export type Personality = {
  id: number
  assertiveTurbulent: number
  extroversionIntroversion: number
  judgingPerceiving: number
  sensingIntuition: number
  thinkingFeeling: number
  distance: number
  entity: Entity
  book?: Book
  author?: Author
  quote?: Quote
  character?: Character
  user?: User
}

// Reactions

export enum ReactionType {
  LOVE = "LOVE",
  LIKE = "LIKE",
  MEH = "MEH",
  DISLIKE = "DISLIKE",
  HATE = "HATE",
}

export type Reaction = {
  id: number
  entity: Entity
  type: ReactionType
  favorite: boolean
  list: boolean
  user?: User
  quote?: Quote
  book?: Book
  author?: Author
  character?: Character
  reactedUser?: UserReacted
  userId: number
  quoteId: number | null
  bookId: number | null
  authorId: number | null
  characterId: number | null
  reactedUserId: number | null
}

export type ReactionCreate = {
  id: number
  entity: Entity
  type: ReactionType
  favorite: boolean
  list: boolean
  userId?: number
  quoteId: number | null
  bookId: number | null
  authorId: number | null
  characterId: number | null
  reactedUserId: number | null
}

// export type EntityTotal = {
//   TOTAL: number
//   LOVE: number
//   LIKE: number
//   DISLIKE: number
//   HATE: number
// }

export type EntityTotal = Record<ReactionType | "TOTAL", number>
// export type ReactionTotal = {
//   TOTAL: number
//   AUTHOR: EntityTotal
//   BOOK: EntityTotal
//   QUOTE: EntityTotal
//   CHARACTER: EntityTotal
//   USER: EntityTotal
// }
export type TotalReaction = Record<Entity, EntityTotal> & { TOTAL: number }

export type LatestReaction = Record<Entity, Record<ReactionType, Reaction[]>>
