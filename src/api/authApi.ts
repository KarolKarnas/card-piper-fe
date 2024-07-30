import type { UserInfo } from "../types/entities"
import { api } from "./apiSlice"
import type { SigninRequestParams, SignupRequestParams } from "../types/request"
import { RequestState } from "../types/request"
import { setUserInfoRequestState } from "../store/authSlice"

const URL_API_AUTH = "/auth"

const authApi = api.injectEndpoints({
  endpoints: build => ({
    signup: build.mutation<UserInfo, SignupRequestParams>({
      query: data => ({
        url: `${URL_API_AUTH}/signup`,
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
        url: `${URL_API_AUTH}/signin`,
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
