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
