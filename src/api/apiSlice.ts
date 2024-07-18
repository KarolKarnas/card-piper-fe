import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../store/store"

//TODO move to env
const baseUrl = "http://localhost:3001/api"

export const api = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.userInfo?.access_token

    //   // If we have a token set in state, let's assume that we should be passing it.
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`)
    //   }

    //   return headers
    // },
  }),
  tagTypes: ["Quotes"],
  endpoints: builder => ({}),
})
