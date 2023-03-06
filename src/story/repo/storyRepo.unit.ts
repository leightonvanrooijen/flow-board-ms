import { buildStoryRepo } from "./storyRepo"
import { TestDB } from "../../common/db/testDB"
import { Story } from "../domain/story"
import { fakeStories, fakeStory } from "../domain/story.fake"

const setUp = (dbData: Story[] = []) => {
  const db = new TestDB<Story>(dbData, "id")
  const storyRepo = buildStoryRepo({ db })

  return { storyRepo, db }
}

describe("buildStoryRepo", () => {
  describe("createDbStory", () => {
    it("should create a story in the data store", async () => {
      const { storyRepo, db } = setUp()
      const story = fakeStory()

      await storyRepo.createDbStory(story)

      expect(await db.get(story["id"])).toEqual(story)
    })
    it("should get a story by id", async () => {
      const storyFake = fakeStory()
      const { storyRepo } = setUp([storyFake])

      const story = await storyRepo.getDbStory(storyFake.id)

      expect(story).toEqual(storyFake)
    })
    it("should get a stories by id", async () => {
      const storyFakes = fakeStories(2)
      const { storyRepo } = setUp(storyFakes)

      const stories = await storyRepo.getDbStories([storyFakes[0].id, storyFakes[1].id])

      expect(stories).toEqual(storyFakes)
    })
  })
})
