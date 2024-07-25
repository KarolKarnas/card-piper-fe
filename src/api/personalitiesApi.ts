import { api } from "./apiSlice"
import type {
  CreatePersonalityReactionRequestParams,
  PersonalitiesRequestParams,
} from "../types/request"
import { RequestState } from "../types/request"

import type { Personality } from "../types/entities"
import {
  addPersonalities,
  setAllPersonalities,
  setCreatePersonalityReactionRequestState,
  setPersonalitiesRequestState,
  updatePersonality,
} from "../store/personalitiesSlice"

const URL_API_PERSONALITY = "/personality"

const personalitiesApi = api.injectEndpoints({
  endpoints: build => ({
    //TODO change response type
    getPersonalities: build.query<Personality[], PersonalitiesRequestParams>({
      query: args => {
        const { skip, take, userPersonality, entity, entities } = args

        let params = {
          skip,
          take,
          ...userPersonality,
          entity,
          entities,
        }

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
        dispatch(setPersonalitiesRequestState(RequestState.LOADING))
        try {
          const { data } = await queryFulfilled
          if (data) {
            dispatch(setPersonalitiesRequestState(RequestState.SUCCESS))
            // dispatch(setAllPersonalities(data))
            dispatch(addPersonalities(data))
          }
        } catch (error) {
          dispatch(setPersonalitiesRequestState(RequestState.ERROR))
          console.log(error)
        }
      },
      providesTags: (result, error) => [{ type: "Personalities" }],
    }),
    createPersonalityReaction: build.mutation<
      Personality,
      CreatePersonalityReactionRequestParams
    >({
      query: ({ id, createReaction }) => ({
        url: `${URL_API_PERSONALITY}/${id}/reaction`,
        method: "POST",
        body: createReaction,
      }),
      async onQueryStarted(
        { id, createReaction },
        { dispatch, queryFulfilled },
      ) {
        dispatch(
          setCreatePersonalityReactionRequestState({
            id: id,
            requestState: RequestState.LOADING,
          }),
        )
        // Optimistic update logic (if any) can go here
        try {
          const { data } = await queryFulfilled
          if (data) {
            dispatch(
              setCreatePersonalityReactionRequestState({
                id: id,
                requestState: RequestState.SUCCESS,
              }),
            )
            dispatch(updatePersonality(data))
          }
        } catch (error) {
          dispatch(
            setCreatePersonalityReactionRequestState({
              id: id,
              requestState: RequestState.ERROR,
            }),
          )
          console.error("Failed to create reaction: ", error)
          // Handle errors if needed
        }
      },
    }),
  }),
})

export const {
  useGetPersonalitiesQuery,
  useCreatePersonalityReactionMutation,
} = personalitiesApi
