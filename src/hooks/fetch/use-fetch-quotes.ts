import { useEffect } from "react"
import { useGetQuotesQuery } from "../../api/quotesApi"
import { useAppDispatch } from "../../store/hooks"
import { setAllQuotes } from "../../store/quotesSlice"
import type { Personality } from "../../types/user"
// import { QuotesRequestParams } from '../../../types/request';

export const useFetchQuotes = (
  skip: number,
  take: number,
  userPersonality: Personality | null,
) => {
  const dispatch = useAppDispatch()

  const { data, isFetching, isError, refetch } = useGetQuotesQuery({
    skip,
    take,
    userPersonality,
  })

  useEffect(() => {
    refetch()
  }, [dispatch, refetch])

  useEffect(() => {
    if (data) {

      // console.log(data)
      dispatch(setAllQuotes(data))
    }
  }, [data, dispatch])
}
