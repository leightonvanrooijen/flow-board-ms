import { buildBoardStoryRepo } from "./storyRepo"
import { fakeStories } from "../../story/domain/story.fake"

describe("buildBoardStoryRepo", () => {
  describe("getRepoStories", () => {
    it("should get a story", async () => {
      const getStories = jest.fn((ids) => Promise.resolve(storyFakes))
      const storyFakes = fakeStories(2)

      const { getRepoStories } = buildBoardStoryRepo({ getStories })

      const ids = [storyFakes[0].id, storyFakes[1].id]
      const stories = await getRepoStories(ids)

      expect(getStories).toHaveBeenCalledWith(ids)
      expect(stories).toEqual(storyFakes)
    })
    it("throws if the story with the ID provided doesn't exist", async () => {
      const { getRepoStories } = buildBoardStoryRepo({
        getStories: (ids) => {
          throw new Error("as")
        },
      })

      const story = async () => getRepoStories(["x"])

      await expect(story).rejects.toThrow()
    })
  })
})
