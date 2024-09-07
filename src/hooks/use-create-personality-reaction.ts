import { toast } from "react-toastify"
import { useCreatePersonalityReactionMutation } from "../api/personalitiesApi"
import { MINIMUM_REACTION_NUM } from "../components/header/header"
import type { CreatePersonalityReactionRequestParams } from "../types/request"
import { useFetchUserMe } from "./fetch/use-fetch-user-me"
import type { UserMe } from "../types"

export const useCreatePersonalityReaction = () => {
  const [createPersonalityReaction] = useCreatePersonalityReactionMutation()
  const { refetch: refetchUserMe } = useFetchUserMe()

  const handleCreatePersonalityReaction = async (
    req: CreatePersonalityReactionRequestParams,
  ) => {
    const { data } = await createPersonalityReaction(req)
    if (data) {
      const freshUserMe = await refetchUserMe()
      const typedUserMe = freshUserMe.data as UserMe

      if (typedUserMe.total_reaction_num === MINIMUM_REACTION_NUM) {
        toast.success(
          `Congratulations. most probably you are an ${typedUserMe.personalityType} `,
        )
      }
    }
  }

  return { handleCreatePersonalityReaction }
}
