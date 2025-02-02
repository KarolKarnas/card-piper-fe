import { api } from "./apiSlice"
import { RequestState } from "../types/request"
import type { UserMe } from "../types/entities"
import { setUserMe, setUserMeRequestState } from "../store/usersSlice"

const URL_API_USERS = "/users"

const usersApi = api.injectEndpoints({
  endpoints: build => ({
    getUserMe: build.query<UserMe, void>({
      query: _args => {
        return {
          url: `${URL_API_USERS}/me`,
          method: "GET",
        }
      },
      keepUnusedDataFor: 5,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          dispatch(setUserMeRequestState(RequestState.LOADING))
          const { data } = await queryFulfilled
          if (data) {
            dispatch(setUserMeRequestState(RequestState.SUCCESS))
            dispatch(setUserMe(data))
          }
        } catch (error) {
          dispatch(setUserMeRequestState(RequestState.ERROR))
          console.log(error)
        }
      },
      providesTags: (_result, _error) => [{ type: "Users" }],
    }),
    updateUserMe: build.mutation<{ message: string }, Partial<UserMe>>({
      query: user => ({
        url: `${URL_API_USERS}/me`,
        method: "PATCH",
        body: user,
      }),
      async onQueryStarted(_user, { dispatch, queryFulfilled }) {
        try {
          dispatch(setUserMeRequestState(RequestState.LOADING))
          const { data } = await queryFulfilled
          if (data) {
            dispatch(setUserMeRequestState(RequestState.SUCCESS))
          }
        } catch (error) {
          dispatch(setUserMeRequestState(RequestState.ERROR))
          console.log(error)
        }
      },
      invalidatesTags: [{ type: "Users" }],
    }),
  }),
})

export const { useGetUserMeQuery, useUpdateUserMeMutation } = usersApi
