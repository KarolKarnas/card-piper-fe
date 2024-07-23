import { useAppSelector } from "../store/hooks"
import { selectUserMe } from "../store/usersSlice"

export const useTheme = () => {
  const userMe = useAppSelector(selectUserMe)

  if (userMe) return userMe?.darkTheme
}
