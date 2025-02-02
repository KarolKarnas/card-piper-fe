import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../store/store"
import { CARD_PIPER_API_URL } from "../utils/envs"

const baseUrl = CARD_PIPER_API_URL

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userInfo?.access_token

      // If we have a token set in state, we pass it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ["Quotes", "Users", "Personalities"],
  endpoints: builder => ({}),
})
