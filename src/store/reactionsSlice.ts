import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import type { UserInfo, UserMe } from "../types/entities"
import { RequestState } from "../types/request"
import type { RootState } from "./store"

export type StoreState = {
  createReactionRequestState: RequestState
}

const initialState: StoreState = {
  createReactionRequestState: RequestState.IDLE,
}

export const reactionsSlice = createSlice({
  name: "reactions",
  initialState,
  reducers: {
    setCreateReactionRequestState: (
      state,
      action: PayloadAction<RequestState>,
    ) => {
      state.createReactionRequestState = action.payload
    },
  },
})

export const { setCreateReactionRequestState } = reactionsSlice.actions

export const selectCreateReactionRequestState = (state: RootState) =>
  state.reactions.createReactionRequestState
