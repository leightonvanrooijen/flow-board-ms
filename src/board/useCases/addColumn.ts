import { BoardRepo } from "../repo/boardRepo"
import { MakeBoard } from "../domain/board/board"
import { Column } from "../domain/column/column"
import { AddColumn } from "../domain/addColumn"

type BuildAddColumnProps = { repo: BoardRepo; makeBoard: MakeBoard; addColumn: AddColumn }

export const buildAddColumn = ({ repo, makeBoard, addColumn }: BuildAddColumnProps) => {
  return async function addColumnUc(boardId: string, column: Column) {
    const dbBoard = await repo.get(boardId)
    const board = makeBoard(dbBoard)

    const boardWithColumn = addColumn(board, column)

    return repo.update(boardWithColumn)
  }
}
