import express, { Application, Request, Response } from "express"
import cors from "cors"
import { DataStore, TestDB } from "./common/db/testDB"
import { Board, buildMakeBoard } from "./board/domain/board/board"
import { makeColumn } from "./board/domain/column/column"
import { buildBoardRepo } from "./board/repo/boardRepo"
import { buildCreateBoard } from "./board/useCases/createBoard"
import { v4 } from "uuid"
import { Story } from "./story/domain/story"
import { buildStoryRepo } from "./story/repo/storyRepo"
import { buildGetStory } from "./story/useCases/getStory"
import { getStoryApi } from "./story/api/getStoryApi"
import { buildGetBoard } from "./board/useCases/getBoard"
import { fakeBoard } from "./board/domain/board/board.fake"
import { fakeStories } from "./story/domain/story.fake"
import { buildAddColumn } from "./board/useCases/addColumn"
import { addColumn } from "./board/domain/addColumn"
import { buildGetStories, GetStories } from "./story/useCases/getStories"
import { getStoriesApi } from "./story/api/getStoriesApi"
import { buildBoardStoryRepo } from "./board/repo/storyRepo"

export const populateFakeData = async (boardDb: DataStore<Board>, storyDb: DataStore<Story>) => {
  const boardFake = fakeBoard({ id: "22" })
  await boardDb.create(boardFake)

  // create stories with matching ids of stories in the board
  const storiesIds = boardFake.columns.flatMap((column) => {
    return column.storyIds.map((id) => {
      return { id }
    })
  })

  for await (const story of fakeStories(storiesIds.length, storiesIds)) {
    await storyDb.create(story)
  }
}

export const buildBoardApis = (app: Application, db: DataStore<Board>, getStories: GetStories) => {
  const repo = buildBoardRepo({ db })

  const storyRepo = buildBoardStoryRepo({ getStories })

  const getBoard = buildGetBoard({ repo, storyRepo })

  const makeBoard = buildMakeBoard({ makeColumn, uuid: v4 })
  const createBoard = buildCreateBoard({ repo, makeBoard })
  const addColumnUc = buildAddColumn({ repo, makeBoard, addColumn })

  app.post("/createBoard", async (req: Request, res: Response) => {
    try {
      const board = await createBoard(req.body)
      res.status(200).send({ data: board })
    } catch (e) {
      res.status(400).send({ data: e.message })
    }
  })

  app.get("/board/:id", async (req: Request, res: Response) => {
    try {
      const board = await getBoard(req.params.id)
      res.status(200).send({ data: board })
    } catch (e) {
      res.status(400).send({ data: e.message })
    }
  })

  app.post("/board/:id/addColumn", async (req: Request, res: Response) => {
    try {
      const board = await addColumnUc(req.params.id, req.body)
      res.status(200).send({ data: board })
    } catch (e) {
      res.status(400).send({ data: e.message })
    }
  })
}

export const buildStoryApis = (app: Application, db: DataStore<Story>) => {
  const { getDbStory, getDbStories } = buildStoryRepo({ db })
  const getStory = buildGetStory({ getDbStory })
  const getStories = buildGetStories({ getDbStories })

  getStoryApi({ app, getStory })
  getStoriesApi({ app, getStories })
}

export const app = async (
  port = 4000,
  boardDb: DataStore<Board> = new TestDB<Board>([], "id"),
  storyDb: DataStore<Story> = new TestDB<Story>([], "id"),
) => {
  const app: Application = express()

  app.use(cors())
  app.use(express.json())

  // remove this when services are split
  const { getDbStories } = buildStoryRepo({ db: storyDb })
  const getStories = buildGetStories({ getDbStories })
  // done

  buildBoardApis(app, boardDb, getStories)
  buildStoryApis(app, storyDb)

  await populateFakeData(boardDb, storyDb)

  app.listen(port, () => console.log(`Server is listening on port ${port}!`))
}

// app().then()
