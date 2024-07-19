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
  books: []
  authors: []
  quotes: []
  characters: []
  users: []
}
