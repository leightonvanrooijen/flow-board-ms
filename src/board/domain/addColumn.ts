import { Board } from "./board/board"
import { Column } from "./column/column"

export type AddColumn = typeof addColumn

export const addColumn = (board: Board, column: Column) => {
  if (board.columns.find(({ name }) => name === column.name)) {
    throw new Error("Column with the name provided already exists")
  }

  return {
    ...board,
    columns: [...board.columns, column],
  }
}
