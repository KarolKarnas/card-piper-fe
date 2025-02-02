import { useEffect } from "react"
import { useAppDispatch } from "../../store/hooks"
import { useGetUserMeQuery } from "../../api/usersApi"

export const useFetchUserMe = () => {
  const dispatch = useAppDispatch()

  const { refetch } = useGetUserMeQuery()

  useEffect(() => {
    refetch()
  }, [dispatch, refetch])

  return { refetch }
}
