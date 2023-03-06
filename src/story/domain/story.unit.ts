import { fakeStory } from "./story.fake"
import { makeStory, StoryTypes } from "./story"

describe("makeStory", () => {
  it("must have an id", () => {
    const input = fakeStory({ id: "" })

    const story = () => makeStory(input)

    expect(story).toThrow()
  })
  it("must have an title", () => {
    const input = fakeStory({ title: "" })

    const story = () => makeStory(input)

    expect(story).toThrow()
  })
  it("type is set to unknown if not provided", () => {
    const input = fakeStory({ type: "" as StoryTypes })

    const story = makeStory(input)

    expect(story.type).toEqual("unknown")
  })
})
