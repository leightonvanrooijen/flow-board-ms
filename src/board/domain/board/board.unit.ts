import { buildMakeBoard } from "./board"
import { fakeBoard } from "./board.fake"
import { fakeColumns } from "../column/column.fake"

describe("makeBoard", () => {
  it("generates an id if one is not provided", () => {
    const makeBoard = buildMakeBoard({ makeColumn: jest.fn(), uuid: () => "xyz" })

    const board = makeBoard(fakeBoard({ id: undefined }))

    expect(board.id).toBeTruthy()
  })
  it("makes a column for each one entered", () => {
    const makeColumn = jest.fn()
    const makeBoard = buildMakeBoard({ makeColumn, uuid: () => "xyz" })

    const numOfColumns = 3
    const columns = fakeColumns(numOfColumns)
    makeBoard(fakeBoard({ columns }))

    expect(makeColumn).toHaveBeenCalledTimes(numOfColumns)
  })
  it("must have a name", () => {
    const fakeInput = fakeBoard({ name: "" })
    const makeBoard = buildMakeBoard({ makeColumn: jest.fn(), uuid: () => "xyz" })

    const board = () => makeBoard(fakeInput)

    expect(board).toThrow()
  })
  it("must have at least one Column", () => {
    const fakeInput = fakeBoard({ columns: [] })
    const makeBoard = buildMakeBoard({ makeColumn: jest.fn(), uuid: () => "xyz" })

    const board = () => makeBoard(fakeInput)

    expect(board).toThrow()
  })
})
