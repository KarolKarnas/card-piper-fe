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
  email: string
  personality: PersonalityStats
  role: UserRole | null
}

export type UserOrder = Omit<UserInfo, "isAdmin">

export interface UserOrderPassword extends Omit<UserInfo, "isAdmin"> {
  password: string
}

export interface UserInfoOptions {
  _id?: string
  name?: string
  email?: string
  isAdmin?: boolean
}

export enum FormLoginRole {
  SIGNIN = "SIGNIN",
  SIGNUP = "SIGNUP",
}

// AUTHOR

export type Author = {
  id: number
  name: string
  books: Book[]
}

// BOOK

export type Book = {
  id: number
  title: string
  author: Author
  characters: Character[]
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
}

// CHARACTER

export type Character = {
  id: number
  name: string
  books: Book[]
}

// USER

export type User = {
  id: number
  email: string
  personality: PersonalityStats
  reactedBy: Reaction[]
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
  id: string
  assertiveTurbulent: number
  extroversionIntroversion: number
  judgingPerceiving: number
  sensingIntuition: number
  thinkingFeeling: number
  distance: number
  entity: Entity
  book?: Book
  author?: Author
  quotes?: Quote
  character?: Character
  user?: User
}

// Reactions

export enum ReactionType {
  LOVE = "LOVE",
  LIKE = "LIKE",
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
  reactedUser?: User
}
