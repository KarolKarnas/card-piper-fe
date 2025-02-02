import { useCreateReactionMutation } from "../api/reactionsApi"
import type { CreateReactionRequest } from "../types/request"
import { useFetchUserMe } from "./fetch/use-fetch-user-me"

export const useCreateReaction = () => {
  const [createReaction] = useCreateReactionMutation()
  const { refetch: refetchUserMe } = useFetchUserMe()

  const handleCreateReaction = async (req: CreateReactionRequest) => {
    const { data } = await createReaction(req)
    if (data) {
      refetchUserMe()
    }
  }

  return { handleCreateReaction }
}
