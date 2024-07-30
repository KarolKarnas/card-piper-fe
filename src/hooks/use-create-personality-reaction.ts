import { useCreatePersonalityReactionMutation } from "../api/personalitiesApi"
import { useAppDispatch } from "../store/hooks"
import type { CreatePersonalityReactionRequestParams } from "../types/request"
import { useFetchUserMe } from "./fetch/use-fetch-user-me"

export const useCreatePersonalityReaction = () => {
  const [createPersonalityReaction] = useCreatePersonalityReactionMutation()
  const { refetch: refetchUserMe } = useFetchUserMe()
  const dispatch = useAppDispatch()

  const handleCreatePersonalityReaction = async (
    req: CreatePersonalityReactionRequestParams,
  ) => {
    const { data } = await createPersonalityReaction(req)
    if (data) {
      refetchUserMe()
    }
  }

  return { handleCreatePersonalityReaction }
}
