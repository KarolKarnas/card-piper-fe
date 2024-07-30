import { useUpdateUserMeMutation } from "../api/usersApi"
import type { UserMe } from "../types"
import { useFetchUserMe } from "./fetch/use-fetch-user-me"

export const useUpdateUserMe = () => {
  const [updateUserMe] = useUpdateUserMeMutation()
  const { refetch: refetchUserMe } = useFetchUserMe()

  const handleUpdateUserMe = async (user: Partial<UserMe>) => {
    const { data } = await updateUserMe(user)
    if (data) {
      refetchUserMe()
    }
  }

  return { handleUpdateUserMe }
}
