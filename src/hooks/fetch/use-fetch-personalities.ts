import { useEffect } from "react"
import { useAppDispatch } from "../../store/hooks"
import type { PersonalityStats } from "../../types/entities"
import { useGetPersonalitiesQuery } from "../../api/personalitiesApi"
import type { Entity } from "../../types/entities"
import { setAllPersonalities } from "../../store/personalitiesSlice"
// import { QuotesRequestParams } from '../../../types/request';

export const useFetchPersonalities = (
  skip: number,
  take: number,
  userPersonality: PersonalityStats | null,
  entity: Entity,
  entities: Entity[],
) => {
  const dispatch = useAppDispatch()

  const { data, isFetching, isError, refetch } = useGetPersonalitiesQuery({
    skip,
    take,
    userPersonality,
    entity,
    entities,
  })

  console.log(data)

  useEffect(() => {
    refetch()
  }, [dispatch, refetch])

  useEffect(() => {
    if (data) {
      // console.log(data)
      dispatch(setAllPersonalities(data))
    }
  }, [data, dispatch])
}
