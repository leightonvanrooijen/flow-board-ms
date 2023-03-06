import { When, Then } from "@cucumber/cucumber"
import { fakeStories } from "../domain/story.fake"
import { equal } from "assert"

When(/^a user asks for stories$/, async function () {
  const storyFakes = fakeStories(2)
  this["storyFakes"] = storyFakes
  await this.storyDb.create(storyFakes[0])
  await this.storyDb.create(storyFakes[1])

  const ids = [storyFakes[0].id, storyFakes[1].id].join()
  const resp = await this.get("stories", { ids })
  this["stories"] = resp.data.data
})

Then(/^the user should get the stories$/, async function () {
  equal(this["stories"][0].title, this["storyFakes"][0].title)
})
