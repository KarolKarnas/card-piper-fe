import type { ReactionType } from "../types";
import { Entity } from "../types";

export const createReactionArgs = (
  userId: number,
  entity: Entity,
  type: ReactionType,
  entityId: number,
  additionalParams?: { favorite?: boolean; list?: boolean }
) => {
  switch (entity) {
    case Entity.CHARACTER:
      return {
        userId,
        type,
        entity: Entity.CHARACTER,
        favorite: additionalParams?.favorite ?? false,
        list: additionalParams?.list ?? false,
        characterId: entityId,
      }

    case Entity.BOOK:
      return {
        userId,
        type,
        entity: Entity.BOOK,
        favorite: additionalParams?.favorite ?? false,
        list: additionalParams?.list ?? false,
        bookId: entityId,
      }

    case Entity.AUTHOR:
      return {
        userId,
        type,
        entity: Entity.AUTHOR,
        favorite: additionalParams?.favorite ?? false,
        list: additionalParams?.list ?? false,
        authorId: entityId,
      }

    case Entity.QUOTE:
      return {
        userId,
        type,
        entity: Entity.QUOTE,
        favorite: additionalParams?.favorite ?? false,
        list: additionalParams?.list ?? false,
        quoteId: entityId,
      }

    case Entity.USER:
      return {
        userId,
        type,
        entity: Entity.USER,
        favorite: additionalParams?.favorite ?? false,
        list: additionalParams?.list ?? false,
        reactedUserId: entityId,
      }

    default:
      throw new Error("Unsupported entity type")
  }
}