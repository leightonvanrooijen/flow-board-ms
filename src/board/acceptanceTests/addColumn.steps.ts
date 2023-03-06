import { Then, When, Given } from "@cucumber/cucumber"
import { addColumnToBoardViaApi, createBoardViaApi, setUpBoardAndStoryMocks } from "./utils"
import { CustomWorld } from "../../common/acceptanceTests/world"
import { equal } from "assert"

// Scenario: Column is added to a board
When(/^a user adds a column to a board$/, async function (this: CustomWorld) {
  const { boardFake } = await setUpBoardAndStoryMocks({ boardDb: this.boardDb, storyDb: this.storyDb })
  const { fakeColumn } = await addColumnToBoardViaApi({ world: this, boardId: boardFake.id })

  this["boardId"] = boardFake.id
  this["columnName"] = fakeColumn.name
})

Then(/^a column should exist on that board$/, async function () {
  const savedBoard = await this.boardDb.get(this["boardId"])
  const columnExists = savedBoard.columns.find((column) => column.name === this["columnName"])

  equal(Boolean(columnExists), true)
})

// Scenario: Column that already exists is added to a board
Given(/^a column already exists on a board$/, async function (this: CustomWorld) {
  this["columnName"] = "Column 1"
  const { resp } = await createBoardViaApi({ world: this, columnOverwrites: { name: this["columnName"] } })

  this["boardId"] = resp.data.id
})

When(/^a user adds a column with the same name to that board$/, async function (this: CustomWorld) {
  const resp = await addColumnToBoardViaApi({
    world: this,
    boardId: this["boardId"],
    columnOverwrites: { name: this["columnName"] },
  })

  this["resp"] = resp
})

Then(/^the user should get an error$/, async function () {
  equal(this["resp"].status, 400)
})
