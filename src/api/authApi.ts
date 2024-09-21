import type { UserInfo } from "../types/entities"
import { api } from "./apiSlice"
import type { SigninRequestParams, SignupRequestParams } from "../types/request"
import { RequestState } from "../types/request"
import { setUserInfoRequestState } from "../store/authSlice"
import { toast } from "react-toastify"
import { getErrorMessage } from "../utils/get-error-message"
import type { ApiError } from "../types/errors"

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
          await queryFulfilled
          dispatch(setUserInfoRequestState(RequestState.SUCCESS))
          toast.success("Signup successfully, welcome", { autoClose: 4000 })
          toast.info("React to at least 3 cards, and we'll let you know your personality", { autoClose: 10000 })
        } catch (error) {
          dispatch(setUserInfoRequestState(RequestState.ERROR))
          toast.error(getErrorMessage(error as ApiError))
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
          await queryFulfilled
          dispatch(setUserInfoRequestState(RequestState.SUCCESS))
          toast.success("Signin successfully")
        } catch (error) {
          dispatch(setUserInfoRequestState(RequestState.ERROR))
          toast.error(getErrorMessage(error as ApiError))
        }
      },
    }),
  }),
})

export const { useSignupMutation, useSigninMutation } = authApi
