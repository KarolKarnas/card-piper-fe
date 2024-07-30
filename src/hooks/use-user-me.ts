import { useAppSelector } from "../store/hooks"
import { selectUserMe } from "../store/usersSlice"

export const useUserMe = () => {
  const userMe = useAppSelector(selectUserMe)

  if (userMe) return userMe
}
