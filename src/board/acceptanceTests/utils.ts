import { Board } from "../domain/board/board"
import { Column } from "../domain/column/column"
import { CustomWorld } from "../../common/acceptanceTests/world"
import { fakeBoard } from "../domain/board/board.fake"
import { fakeColumn, fakeColumns } from "../domain/column/column.fake"
import { fakeStories } from "../../story/domain/story.fake"
import { DataStore } from "../../common/db/testDB"
import { Story } from "../../story/domain/story"
import { faker } from "@faker-js/faker"

export class BoardBuilder {
  private board: Board

  static make() {
    return new BoardBuilder()
  }

  createBoard(overwrites?: Partial<Board>) {
    this.board = fakeBoard(overwrites)
    return this
  }

  addColumn(overwrites?: Partial<Column>) {
    this.board.columns = [...this.board.columns, fakeColumn(overwrites)]
    return this
  }

  build() {
    return this.board
  }
}

export const getBoardViaApi = async (world: CustomWorld, id: string) => {
  return world.get(`board/${id}`)
}

export const createBoardViaApi = async ({
  world,
  boardOverwrites,
  columnOverwrites,
}: {
  world: CustomWorld
  boardOverwrites?: Partial<Board>
  columnOverwrites?: Partial<Column>
}) => {
  const fakeBoard = BoardBuilder.make().createBoard(boardOverwrites).addColumn(columnOverwrites).build()

  const resp = await world.post("createBoard", fakeBoard)
  return { resp: resp.data, fakeBoard }
}

export const addColumnToBoardViaApi = async ({
  world,
  boardId,
  columnOverwrites,
}: {
  world: CustomWorld
  boardId: string
  columnOverwrites?: Partial<Column>
}) => {
  const column = fakeColumn(columnOverwrites)
  try {
    const resp = await world.post(`board/${boardId}/addColumn`, column)
    return { resp, fakeColumn: column }
  } catch (e) {
    return e.response
  }
}

export const setUpBoardAndStoryMocks = async ({
  boardDb,
  storyDb,
}: {
  boardDb: DataStore<Board>
  storyDb: DataStore<Story>
}) => {
  const storyId1 = faker.datatype.uuid()
  const storyId2 = faker.datatype.uuid()
  const columnFakes = fakeColumns(2, [{ storyIds: [storyId1] }, { storyIds: [storyId1, storyId2] }])
  const boardFake = fakeBoard({ columns: columnFakes })
  const storyFakes = fakeStories(2, [{ id: storyId1 }, { id: storyId2 }])

  await boardDb.create(boardFake)
  await storyDb.create(storyFakes[0])
  await storyDb.create(storyFakes[1])

  return { boardFake }
}
