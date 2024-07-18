import type { UserInfo } from "../types/user"
import { api } from "./apiSlice"
import type { SigninRequestParams, SignupRequestParams } from "../types/request"
import { RequestState } from "../types/request"
import { setUserInfoRequestState } from "../store/authSlice"

const authApi = api.injectEndpoints({
  endpoints: build => ({
    signup: build.mutation<UserInfo, SignupRequestParams>({
      query: data => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        dispatch(setUserInfoRequestState(RequestState.LOADING))
        try {
          console.log("Signin successfully")
          dispatch(setUserInfoRequestState(RequestState.SUCCESS))
        } catch (error) {
          console.log(error)
          dispatch(setUserInfoRequestState(RequestState.ERROR))
        }
      },
    }),
    signin: build.mutation<UserInfo, SigninRequestParams>({
      query: data => ({
        url: `/auth/signin`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        dispatch(setUserInfoRequestState(RequestState.LOADING))
        try {
          console.log("Signin successfully")
          dispatch(setUserInfoRequestState(RequestState.SUCCESS))
        } catch (error) {
          console.log(error)
          dispatch(setUserInfoRequestState(RequestState.ERROR))
        }
      },
    }),
  }),
})

export const { useSignupMutation, useSigninMutation } = authApi
