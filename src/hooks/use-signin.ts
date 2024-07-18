import { useSigninMutation } from "../api/authApi"
import { setCredentials } from "../store/authSlice"
import { useAppDispatch } from "../store/hooks"
import type { SigninRequestParams } from "../types/request"

export const useSignin = () => {
  const [signin] = useSigninMutation()
  const dispatch = useAppDispatch()

  const handleSignin = async (req: SigninRequestParams) => {
    const { data } = await signin(req)
    if (data) {
      dispatch(setCredentials(data))
    }
  }

  return { handleSignin }
}
