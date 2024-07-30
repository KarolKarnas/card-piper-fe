import { useSigninMutation } from "../api/authApi"
import { setCredentials } from "../store/authSlice"
import { useAppDispatch } from "../store/hooks"
import type { SigninRequestParams } from "../types/request"
import { useFetchUserMe } from "./fetch/use-fetch-user-me"

export const useSignin = () => {
  const [signin] = useSigninMutation()
  const dispatch = useAppDispatch()
  const { refetch: refetchUserMe } = useFetchUserMe()

  const handleSignin = async (req: SigninRequestParams) => {
    const { data } = await signin(req)
    if (data) {
      dispatch(setCredentials(data))
      refetchUserMe()
    }
  }

  return { handleSignin }
}
