import { api } from "./apiSlice"
import type { QuotesRequestParams} from "../types/request";
import { RequestState } from "../types/request"
import type { Quote } from "../types/quotes"
import { setAllQuotes, setRequestState } from "../store/quotesSlice"

const quotesApi = api.injectEndpoints({
  endpoints: build => ({
    getQuotes: build.query<Quote[], QuotesRequestParams>({
      query: args => {
        const { skip, take } = args
        return `/quotes?skip=${skip}&take=${take}`
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          dispatch(setRequestState(RequestState.LOADING))
          const { data } = await queryFulfilled
          if (data) {
            dispatch(setRequestState(RequestState.SUCCESS))
            dispatch(setAllQuotes(data))
          }
        } catch (error) {
          dispatch(setRequestState(RequestState.ERROR))
          console.log(error)
        }
      },
      providesTags: (result, error) => [{ type: "Quotes" }],
    }),
  }),
})

export const { useGetQuotesQuery } = quotesApi
