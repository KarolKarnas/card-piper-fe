import { useEffect, useState } from "react";
import type { PersonalityStats } from "../../types/entities";
import { useGetPersonalitiesQuery } from "../../api/personalitiesApi";
import type { Entity } from "../../types/entities";

export const useFetchPersonalities = (
  skip: number,
  take: number,
  userPersonality: PersonalityStats | null,
  entity: Entity,
  entities: Entity[],
) => {
  const { refetch } = useGetPersonalitiesQuery({
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

  return { refetch: () => setShouldRefetch(true) };
};