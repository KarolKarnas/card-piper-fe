import { useEffect } from "react"
import { useGetQuotesQuery } from "../../api/quotesApi"
import { useAppDispatch } from "../../store/hooks"
import { setAllQuotes } from "../../store/quotesSlice"
import type { PersonalityStats } from "../../types/entities"

export const useFetchQuotes = (
  skip: number,
  take: number,
  userPersonality: PersonalityStats | null,
) => {
  const dispatch = useAppDispatch()

  const { data, refetch } = useGetQuotesQuery({
    skip,
    take,
    userPersonality,
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
