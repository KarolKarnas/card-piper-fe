import type { Entity } from "./personality"
import type { PersonalityStats } from "./user"

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
}

export type SignupRequestParams = {
  email: string
  password: string
}
export type SigninRequestParams = {
  email: string
  password: string
}
