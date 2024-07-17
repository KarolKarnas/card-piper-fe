import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import type { Quote } from "../types/quotes"
import type { RootState } from "./store"
import { RequestState } from "../types/request"

// Create an entity adapter
const quotesAdapter = createEntityAdapter({
  selectId: (quote: Quote) => quote.id,
  sortComparer: (a, b) => b.popularity - a.popularity,
})

const initialState = quotesAdapter.getInitialState({
  requestState: RequestState.IDLE,
})

export const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    setAllQuotes: (state, action: PayloadAction<Quote[]>) => {
      quotesAdapter.setAll(state, action.payload)
    },
    setRequestState: (state, action: PayloadAction<RequestState>) => {
      state.requestState = action.payload
    },
  },
})

export const { setAllQuotes, setRequestState } = quotesSlice.actions
export const { selectAll: selectAllQuotes } = quotesAdapter.getSelectors(
  (state: RootState) => state.quotes,
)
export const selectQuotesRequestState = (state: RootState) =>
  state.quotes.requestState

export default quotesSlice.reducer
