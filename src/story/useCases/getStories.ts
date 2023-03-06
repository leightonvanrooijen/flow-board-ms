import { GetDbStories } from "../repo/storyRepo"

export type GetStories = ReturnType<typeof buildGetStories>

export const buildGetStories = ({ getDbStories }: { getDbStories: GetDbStories }) => {
  return async function getStories(ids: string[]) {
    if (!ids || ids.length <= 0) throw new Error("An ID must be provided")

    return getDbStories(ids)
  }
}
