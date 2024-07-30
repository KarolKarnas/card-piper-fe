import { useEffect } from "react"
import { useAppDispatch } from "../../store/hooks"
import { useGetUserMeQuery } from "../../api/usersApi"
import { setUserMe } from "../../store/usersSlice"

export const useFetchUserMe = () => {
  const dispatch = useAppDispatch()

  const { data, isFetching, isError, refetch } = useGetUserMeQuery()

  useEffect(() => {
    refetch()
  }, [dispatch, refetch])

  // useEffect(() => {
  //   if (data) {
  //     // console.log(data)
  //     dispatch(setUserMe(data))
  //   }
  // }, [data, dispatch])

  return { refetch }
}
