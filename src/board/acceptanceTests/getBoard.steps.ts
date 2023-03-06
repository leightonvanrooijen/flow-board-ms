import { When, Then } from "@cucumber/cucumber"
import { equal } from "assert"
import { getBoardViaApi, setUpBoardAndStoryMocks } from "./utils"
import { CustomWorld } from "../../common/acceptanceTests/world"

When(/^user requests a board$/, async function (this: CustomWorld) {
  const { boardFake } = await setUpBoardAndStoryMocks({ boardDb: this.boardDb, storyDb: this.storyDb })
  this["boardFake"] = boardFake

  const resp = await getBoardViaApi(this, boardFake.id)
  this["board"] = resp.data.data
})

Then(/^the user will get the board$/, async function () {
  equal(this["board"].id, this["boardFake"].id)
})
