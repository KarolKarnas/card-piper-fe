import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { RequestState } from "../types/request"
import type { Personality } from "../types/personality"

// Create an entity adapter
const personalitiesAdapter = createEntityAdapter({
  selectId: (personality: Personality) => personality.id,
  sortComparer: (a, b) => a.distance - b.distance,
})

const initialState = personalitiesAdapter.getInitialState({
  requestState: RequestState.IDLE,
})

export const personalitiesSlice = createSlice({
  name: "personalities",
  initialState,
  reducers: {
    setAllPersonalities: (state, action: PayloadAction<Personality[]>) => {
      personalitiesAdapter.setAll(state, action.payload)
    },
    setRequestState: (state, action: PayloadAction<RequestState>) => {
      state.requestState = action.payload
    },
  },
})

export const { setAllPersonalities, setRequestState } = personalitiesSlice.actions
export const { selectAll: selectAllPersonalities } =
  personalitiesAdapter.getSelectors((state: RootState) => state.personalities)

export const selectPersonalitiesRequestState = (state: RootState) =>
  state.personalities.requestState
