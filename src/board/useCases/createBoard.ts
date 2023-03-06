import { Board, MakeBoard } from "../domain/board/board"
import { BoardRepo } from "../repo/boardRepo"

export type MakeCreateBoardProps = { repo: BoardRepo; makeBoard: MakeBoard }

export const buildCreateBoard = ({ repo, makeBoard }: MakeCreateBoardProps) => {
  return async function createBoard(boardInput: Board) {
    const board = makeBoard(boardInput)
    return await repo.create(board)
  }
}
