import type { ApiError } from "../types/errors"

export const getErrorMessage = (error: ApiError) => {
  if (error.error) {
    return error.error.data?.response?.message
  }
}
