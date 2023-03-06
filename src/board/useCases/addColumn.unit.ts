import { TestDB } from "../../common/db/testDB"
import { Board, buildMakeBoard } from "../domain/board/board"
import { buildBoardRepo } from "../repo/boardRepo"
import { buildAddColumn } from "./addColumn"
import { makeColumn } from "../domain/column/column"
import { fakeColumn } from "../domain/column/column.fake"
import { fakeBoard } from "../domain/board/board.fake"
import { addColumn as repoAddColumn } from "../domain/addColumn"
import { v4 } from "uuid"

const setUp = ({ dbData }: { dbData?: Board[] } = {}) => {
  const db = new TestDB<Board>(dbData ?? [], "id")
  const repo = buildBoardRepo({ db })
  const makeBoard = buildMakeBoard({ makeColumn, uuid: v4 })
  const addColumn = buildAddColumn({ repo, makeBoard, addColumn: repoAddColumn })

  return { addColumn, db }
}

describe("makeAddColumn", () => {
  it("should add a column to the board when provided valid input", async () => {
    const boardFake = fakeBoard()
    const { addColumn, db } = setUp({ dbData: [boardFake] })
    const columnFake = fakeColumn()
    await addColumn(boardFake.id, columnFake)

    const board = await db.get(boardFake.id)
    const column = board.columns.find((column) => column.name === columnFake.name)

    expect(column.name).toEqual(columnFake.name)
  })
  it("should throw an error if no board exists with the id provided", async () => {
    const { addColumn } = setUp()
    const columnFake = fakeColumn()

    const addColumnCall = async () => addColumn("id", columnFake)

    await expect(addColumnCall).rejects.toThrow()
  })
})
