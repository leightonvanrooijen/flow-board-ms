import { GetDbStory } from "../repo/storyRepo"

export type GetStory = ReturnType<typeof buildGetStory>

export const buildGetStory = ({ getDbStory }: { getDbStory: GetDbStory }) => {
  return async function getStory(id: string) {
    if (!id) throw new Error("An ID must be provided")

    return getDbStory(id)
  }
}
