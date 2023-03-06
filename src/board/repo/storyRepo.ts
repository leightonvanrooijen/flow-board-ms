import { GetStories } from "../../story/useCases/getStories"
import { BoardStory } from "../useCases/utils/mapStoriesToBoard"

export type BoardStoryRepo = ReturnType<typeof buildBoardStoryRepo>

// Adapter for the Story service to make decoupling easier
export const buildBoardStoryRepo = ({ getStories }: { getStories: GetStories }) => {
  return {
    getRepoStories: async (ids: string[]): Promise<BoardStory[]> => {
      const stories = await getStories(ids)
      return stories.map((story) => ({
        id: story.id,
        title: story.title,
        type: story.type,
      }))
    },
  }
}
