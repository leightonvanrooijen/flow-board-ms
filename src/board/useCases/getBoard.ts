import { BoardRepo } from "../repo/boardRepo"
import { BoardStoryRepo } from "../repo/storyRepo"
import { Board } from "../domain/board/board"
import { mapStoriesToBoard } from "./utils/mapStoriesToBoard"

export type MakeGetBoardProps = { repo: BoardRepo; storyRepo: BoardStoryRepo }

export const buildGetBoard = ({ repo, storyRepo }: MakeGetBoardProps) => {
  return async function getBoard(id: string) {
    if (!id) throw new Error("An ID must be provided")

    const board = await repo.get(id)

    const storyIds = getStoryIdsOnBoard(board)
    const stories = await storyRepo.getRepoStories(storyIds)

    return mapStoriesToBoard(board, stories)
  }
}

export const getStoryIdsOnBoard = (board: Board) => {
  const storyIds = board.columns.flatMap((column) => {
    return column.storyIds
  })
  return [...new Set(storyIds)]
}
