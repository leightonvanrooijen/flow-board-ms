import { buildCreateStory } from "./createStory"
import { TestDB } from "../../common/db/testDB"
import { makeStory, Story } from "../domain/story"
import { buildStoryRepo } from "../repo/storyRepo"
import { fakeStory } from "../domain/story.fake"

const setUp = () => {
  const db = new TestDB<Story>([], "id")
  const { createDbStory } = buildStoryRepo({ db })
  const createStory = buildCreateStory({ makeStory, createDbStory })
  const storyInput = fakeStory()

  return { db, createStory, storyInput }
}

describe("buildCreateStory", () => {
  it("saves a story provided the user enter valid input", async () => {
    const { db, createStory, storyInput } = setUp()

    const createdStory = await createStory(storyInput)
    const dbStory = await db.get(createdStory.id)

    expect(dbStory).toEqual({
      ...storyInput,
      id: expect.any(String),
    })
  })
  it("throws an error if the user enters invalid input", async () => {
    const { createStory } = setUp()

    const createdStory = async () => createStory({ type: "risk", title: "" })

    await expect(createdStory).rejects.toThrow()
  })
})
