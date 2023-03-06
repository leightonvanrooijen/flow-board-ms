import { TestDB } from "../../common/db/testDB"
import { Story } from "../domain/story"
import { buildStoryRepo } from "../repo/storyRepo"
import { fakeStories } from "../domain/story.fake"
import { buildGetStories } from "./getStories"

const setUp = (dbData = fakeStories(3)) => {
  const db = new TestDB<Story>(dbData, "id")
  const { getDbStories } = buildStoryRepo({ db })
  const getStories = buildGetStories({ getDbStories })

  return { getStories }
}

describe("getStories", () => {
  it("should return the stories matching the ID's provided", async () => {
    const storyFakes = fakeStories(3)
    const { getStories } = setUp(storyFakes)

    const stories = await getStories([storyFakes[0].id, storyFakes[2].id])

    expect(stories).toEqual([storyFakes[0], storyFakes[2]])
  })
  it("returns only ids that exist - will silently skip ones that don't", async () => {
    const storyFakes = fakeStories(3)
    const { getStories } = setUp(storyFakes)

    const story = await getStories(["notexist", storyFakes[0].id])

    expect(story).toEqual([storyFakes[0]])
  })
  it("must have an ids provided", async () => {
    const { getStories } = setUp()

    const story = async () => getStories(undefined)

    await expect(story).rejects.toThrow()
  })
})
