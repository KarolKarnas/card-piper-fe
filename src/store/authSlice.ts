import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { UserInfo } from "../types/entities"
import { RequestState } from "../types/request"
import type { RootState } from "../store/store"

export type StoreState = {
  userInfo: UserInfo | null
  userInfoRequestState: RequestState
}

const initialState: StoreState = {
  userInfo: null,
  userInfoRequestState: RequestState.IDLE,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload
    },

    setUserInfoRequestState: (state, action: PayloadAction<RequestState>) => {
      state.userInfoRequestState = action.payload
    },

    clearCredentials: state => {
      state.userInfo = initialState.userInfo
    },
  },
})

export const { setCredentials, clearCredentials, setUserInfoRequestState } =
  authSlice.actions

export const selectUserInfo = (state: RootState) => state.auth.userInfo

export const selectUserInfoRequestState = (state: RootState) =>
  state.auth.userInfoRequestState
