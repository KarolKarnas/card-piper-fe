import type { Personality } from "./user"

export enum RequestState {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type QuotesRequestParams = {
  skip: number
  take: number
  userPersonality: Personality | null
}

export type SignupRequestParams = {
  email: string
  password: string
}
export type SigninRequestParams = {
  email: string
  password: string
}
