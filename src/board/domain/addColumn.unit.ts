import { fakeBoard } from "./board/board.fake"
import { fakeColumn } from "./column/column.fake"
import { addColumn } from "./addColumn"

describe("addColumn", () => {
  it("should add a column to the board passed in", () => {
    const board = fakeBoard()
    const column = fakeColumn()

    const boardWithColumn = addColumn(board, column)

    const addedColumn = boardWithColumn.columns.find(({ name }) => name === column.name)

    expect(addedColumn.name).toEqual(column.name)
  })
  it("throws an error if a column with the name already exists on the board", () => {
    const column = fakeColumn()
    const board = fakeBoard({ columns: [column] })

    const boardWithColumn = () => addColumn(board, column)

    expect(boardWithColumn).toThrow()
  })
})
