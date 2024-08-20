import { toast } from "react-toastify"
import { clearCredentials } from "../store/authSlice"
import { useAppDispatch } from "../store/hooks"
import { clearAllPersonalities } from "../store/personalitiesSlice"
import { clearUserMe } from "../store/usersSlice"

export const useSignout = () => {
  const dispatch = useAppDispatch()

  const handleSignout = async () => {
    dispatch(clearCredentials())
    dispatch(clearUserMe())
    dispatch(clearAllPersonalities())
    toast.success('Logout successfully')
  }

  return { handleSignout }
}
