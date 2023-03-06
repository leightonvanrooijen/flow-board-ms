import { DataStore } from "../../common/db/testDB"
import { Story } from "../domain/story"

export type BuildStoryRepoProps = {
  db: DataStore<Story>
}

export type StoryRepo = ReturnType<typeof buildStoryRepo>

export type CreateDbStory = StoryRepo["createDbStory"]
export type GetDbStory = StoryRepo["getDbStory"]
export type GetDbStories = StoryRepo["getDbStories"]

export const buildStoryRepo = ({ db }: BuildStoryRepoProps) => {
  return {
    createDbStory: async (story: Story) => {
      return db.create(story)
    },
    getDbStory: async (id: string) => {
      return db.get(id)
    },
    getDbStories: async (ids: string[]) => {
      return db.getByIds(ids)
    },
  }
}
