import { clearCredentials } from "../store/authSlice"
import { useAppDispatch } from "../store/hooks"
import { clearUserMe } from "../store/usersSlice"

export const useSignout = () => {
  const dispatch = useAppDispatch()

  const handleSignout = async () => {
    dispatch(clearCredentials())
    dispatch(clearUserMe())
  }

  return { handleSignout }
}
