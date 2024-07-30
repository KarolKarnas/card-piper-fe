import { useCreateReactionMutation } from "../api/reactionsApi"
// import { useAppDispatch } from "../store/hooks"
import type { CreateReactionRequest } from "../types/request"
import { useFetchUserMe } from "./fetch/use-fetch-user-me"

export const useCreateReaction = () => {
  const [createReaction] = useCreateReactionMutation()
  const { refetch: refetchUserMe } = useFetchUserMe()
  // const dispatch = useAppDispatch()

  const handleCreateReaction = async (req: CreateReactionRequest) => {
    const { data } = await createReaction(req)
    if (data) {
      // console.log(data)
      refetchUserMe()
    }
  }

  return { handleCreateReaction }
}
