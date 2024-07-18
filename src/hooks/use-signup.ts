import { useSignupMutation } from "../api/authApi"
import { setCredentials } from "../store/authSlice"
import { useAppDispatch } from "../store/hooks"
import type { SignupRequestParams } from "../types/request"

export const useSignup = () => {
  const [signup] = useSignupMutation()
  const dispatch = useAppDispatch()

  const handleSignup = async (req: SignupRequestParams) => {
    const { data } = await signup(req)
    if (data) {
      dispatch(setCredentials(data))
    }
  }

  return { handleSignup }
}
