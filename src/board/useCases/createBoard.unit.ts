import { TestDB } from "../../common/db/testDB"
import { Board, buildMakeBoard } from "../domain/board/board"
import { buildCreateBoard } from "./createBoard"
import { fakeBoard } from "../domain/board/board.fake"
import { buildBoardRepo } from "../repo/boardRepo"
import { makeColumn } from "../domain/column/column"

describe("makeCreatBoard", () => {
  it("creates a board when provided valid input", async () => {
    const db = new TestDB<Board>([], "id")
    const repo = buildBoardRepo({ db })
    const makeBoard = buildMakeBoard({ makeColumn, uuid: () => "xyz" })
    const createBoard = buildCreateBoard({ repo, makeBoard })
    const fakeInput = fakeBoard()

    const board = await createBoard(fakeInput)
    const savedBoard = await db.get(board.id)

    expect(savedBoard).toEqual({ ...fakeInput, id: board.id })
  })
})
