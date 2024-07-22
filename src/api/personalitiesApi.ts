import { api } from "./apiSlice"
import type { PersonalityRequestParams } from "../types/request"
import { RequestState } from "../types/request"

import type { Personality } from "../types/entities"
import {
  setAllPersonalities,
  setRequestState,
} from "../store/personalitiesSlice"

const URL_API_PERSONALITY = "/personality"

const personalitiesApi = api.injectEndpoints({
  endpoints: build => ({
    //TODO change response type
    getPersonalities: build.query<Personality[], PersonalityRequestParams>({
      query: args => {
        const { skip, take, userPersonality, entity, entities } = args

        let params = {
          skip,
          take,
          ...userPersonality,
          entity,
          entities,
        }

        // console.log("params", params)

        if (!userPersonality) {
          params.assertiveTurbulent = 0
          params.extroversionIntroversion = 0
          params.judgingPerceiving = 0
          params.sensingIntuition = 0
          params.thinkingFeeling = 0
        }

        return {
          url: URL_API_PERSONALITY,
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
        dispatch(setRequestState(RequestState.LOADING))
        try {
          await queryFulfilled
          dispatch(setRequestState(RequestState.SUCCESS))
          // const { data } = await queryFulfilled
          // if (data) {
          //   dispatch(setRequestState(RequestState.SUCCESS))
          //   // dispatch(setAllPersonalities(data))
          // }
        } catch (error) {
          dispatch(setRequestState(RequestState.ERROR))
          console.log(error)
        }
      },
      providesTags: (result, error) => [{ type: "Personalities" }],
    }),
  }),
})

export const { useGetPersonalitiesQuery } = personalitiesApi
