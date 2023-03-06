import { MakeStory, Story } from "../domain/story"
import { v4 } from "uuid"
import { CreateDbStory } from "../repo/storyRepo"

export type BuildCreateStoryProps = {
  makeStory: MakeStory
  createDbStory: CreateDbStory
}

export const buildCreateStory = ({ makeStory, createDbStory }: BuildCreateStoryProps) => {
  return async function createStory({ title, type }: Omit<Story, "id">) {
    const story = makeStory({ id: v4(), title, type })

    return await createDbStory(story)
  }
}
