import { api } from "./apiSlice"
import type { QuotesRequestParams } from "../types/request"
import { RequestState } from "../types/request"
import type { Quote } from "../types/entities"
import { setAllQuotes, setRequestState } from "../store/quotesSlice"

const URL_API_QUOTES = "/quotes"

const quotesApi = api.injectEndpoints({
  endpoints: build => ({
    getQuotes: build.query<Quote[], QuotesRequestParams>({
      query: args => {
        const { skip, take, userPersonality } = args

        let params = {
          skip,
          take,
          ...userPersonality,
        }

        if (!userPersonality) {
          params.assertiveTurbulent = 0
          params.extroversionIntroversion = 0
          params.judgingPerceiving = 0
          params.sensingIntuition = 0
          params.thinkingFeeling = 0
        }
        return {
          url: URL_API_QUOTES,
          method: "GET",
          params,
        }
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems)
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      keepUnusedDataFor: 5,
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
