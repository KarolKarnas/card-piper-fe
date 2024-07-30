import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import type { UserInfo, UserMe } from "../types/entities"
import { RequestState } from "../types/request"
import type { RootState } from "../store/store"

export type StoreState = {
  userMe: UserMe | null
  userMeRequestState: RequestState
}

const initialState: StoreState = {
  userMe: null,
  userMeRequestState: RequestState.IDLE,
}

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserMe: (state, action: PayloadAction<UserMe>) => {
      state.userMe = action.payload
    },

    setUserMeRequestState: (state, action: PayloadAction<RequestState>) => {
      state.userMeRequestState = action.payload
    },

    clearUserMe: state => {
      state.userMe = initialState.userMe
    },
  },
})

export const { setUserMe, clearUserMe, setUserMeRequestState } =
  usersSlice.actions

export const selectUserMe = (state: RootState) => state.users.userMe

export const selectUserMeRequestState = (state: RootState) =>
  state.users.userMeRequestState
