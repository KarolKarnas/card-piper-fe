import type { 
  // Reaction,
   ReactionCreate } from "../types/entities"
import { api } from "./apiSlice"
import type {
  CreateReactionRequest,
  // ReactionsRequestParams,
} from "../types/request"
import { RequestState } from "../types/request"
import { setCreateReactionRequestState } from "../store/reactionsSlice"

const URL_API_REACTIONS = "/reaction"

const reactionsApi = api.injectEndpoints({
  endpoints: build => ({
    createReaction: build.mutation<ReactionCreate, CreateReactionRequest>({
      query: data => ({
        url: URL_API_REACTIONS,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        dispatch(setCreateReactionRequestState(RequestState.LOADING))
        try {
          await queryFulfilled
          dispatch(setCreateReactionRequestState(RequestState.SUCCESS))
        } catch (error) {
          dispatch(setCreateReactionRequestState(RequestState.ERROR))
        }
      },
    }),
    // not finished slice, and create hook
    // getReactions: build.query<Reaction[], ReactionsRequestParams>({
    //   query: args => {
    //     const { userId, all, type, entity, favorite, list } = args

    //     let params = {
    //       userId,
    //       all,
    //       type,
    //       entity,
    //       favorite,
    //       list,
    //     }

    //     return {
    //       url: `${URL_API_REACTIONS}/user`,
    //       method: "GET",
    //       params,
    //     }
    //   },
    // }),
  }),
})

export const {
  useCreateReactionMutation,
  // , useGetReactionsQuery
} = reactionsApi
