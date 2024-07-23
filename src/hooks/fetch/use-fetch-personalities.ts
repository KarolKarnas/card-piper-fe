import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import type { PersonalityStats } from "../../types/entities";
import { useGetPersonalitiesQuery } from "../../api/personalitiesApi";
import type { Entity } from "../../types/entities";
import { setAllPersonalities, addPersonalities } from "../../store/personalitiesSlice";

export const useFetchPersonalities = (
  skip: number,
  take: number,
  userPersonality: PersonalityStats | null,
  entity: Entity,
  entities: Entity[],
  // clear: boolean
) => {
  // const dispatch = useAppDispatch();
  const { data, isFetching, isError, refetch } = useGetPersonalitiesQuery({
    skip,
    take,
    userPersonality,
    entity,
    entities,
  });

  const [shouldRefetch, setShouldRefetch] = useState(true);

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false);
    }
  }, [refetch, shouldRefetch]);

  // useEffect(() => {
  //   if (data && shouldRefetch) {
  //     console.log(data)
  //     if (clear) {
  //       console.log(data)
  //       dispatch(setAllPersonalities(data)); // Clear and set new data
  //     } else {
  //       dispatch(addPersonalities(data)); // Append new data
  //     }
  //   }
  // }, [data, dispatch, shouldRefetch, clear]);

  return { refetch: () => setShouldRefetch(true) };
};