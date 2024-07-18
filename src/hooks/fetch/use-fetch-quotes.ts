import { useEffect } from "react"
import { useGetQuotesQuery } from "../../api/quotesApi"
import { useAppDispatch } from "../../store/hooks"
import { setAllQuotes } from "../../store/quotesSlice"
// import { QuotesRequestParams } from '../../../types/request';

export const useFetchQuotes = (skip: number, take: number) => {
  const dispatch = useAppDispatch()

  const { data, isFetching, isError, refetch } = useGetQuotesQuery({
    skip,
    take,
  })

  useEffect(() => {
    refetch()
  }, [dispatch, refetch])

  useEffect(() => {
    if (data) {
      dispatch(setAllQuotes(data))
    }
  }, [data, dispatch])
}
