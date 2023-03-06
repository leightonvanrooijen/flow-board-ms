import { When, Then } from "@cucumber/cucumber"
import { CustomWorld } from "../../common/acceptanceTests/world"
import { equal } from "assert"
import { createBoardViaApi } from "./utils"

When("a user creates a board", async function (this: CustomWorld) {
  const { resp, fakeBoard } = await createBoardViaApi({ world: this })

  this["id"] = resp.data.id
  this["name"] = fakeBoard.name
})

Then("a board should be created", async function (this: CustomWorld) {
  const savedBoard = await this.boardDb.get(this["id"])

  equal(savedBoard.name, this["name"])
})
