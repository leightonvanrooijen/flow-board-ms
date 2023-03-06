import { After, Before, BeforeAll } from "@cucumber/cucumber"
import { app } from "../../app"
import { TestDB } from "../db/testDB"
import { Board } from "../../board/domain/board/board"
import { Story } from "../../story/domain/story"

const port = 4000
const boardDb = new TestDB<Board>([], "id")
const storyDb = new TestDB<Story>([], "id")
const bootTestApp = async () => app(port, boardDb, storyDb)

Before({ tags: "@ignore" }, async function () {
  return "skipped"
})

Before({ tags: "@debug" }, async function () {
  this.debug = true
})

Before({ tags: "@manual" }, async function () {
  return "skipped"
})

Before({ tags: "@acceptance" }, async function (scenario) {
  this.url = `http://localhost:${port}/`
  this.boardDb = boardDb
  this.storyDb = storyDb

  this.context = {
    ...this.context,
    scenario: {
      id: scenario.pickle.id,
      name: scenario.pickle.name,
    },
  }
})

After({ tags: "@acceptance" }, async function (scenario) {})

BeforeAll(async function () {
  await bootTestApp()
})
