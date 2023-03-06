import { TestDB } from "../../common/db/testDB"
import { Story } from "../domain/story"
import { buildStoryRepo } from "../repo/storyRepo"
import { buildGetStory } from "./getStory"
import { fakeStories } from "../domain/story.fake"

const setUp = (dbData = fakeStories(3)) => {
  const db = new TestDB<Story>(dbData, "id")
  const { getDbStory } = buildStoryRepo({ db })
  const getStory = buildGetStory({ getDbStory })

  return { getStory }
}

describe("getStory", () => {
  it("should return the story matching the ID provided", async () => {
    const storyFakes = fakeStories(3)
    const { getStory } = setUp(storyFakes)

    const story = await getStory(storyFakes[0].id)

    expect(story).toEqual(storyFakes[0])
  })
  it("throws in a story does not exist matching the ID provided", async () => {
    const { getStory } = setUp()

    const story = async () => getStory("notexist")

    await expect(story).rejects.toThrow()
  })
  it("must have an id provided", async () => {
    const { getStory } = setUp()

    const story = async () => getStory(undefined)

    await expect(story).rejects.toThrow()
  })
})
