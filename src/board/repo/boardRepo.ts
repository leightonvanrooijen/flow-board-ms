import { DataStore } from "../../common/db/testDB"
import { Board } from "../domain/board/board"
import { DeepPartial } from "../../common/deepPartial"

export type BuildBoardRepoProps = {
  db: DataStore<Board>
}

export type BoardRepo = ReturnType<typeof buildBoardRepo>

export const buildBoardRepo = ({ db }: BuildBoardRepoProps) => {
  return {
    create: async (board: Board) => {
      return db.create(board)
    },
    get: async (id: string) => {
      return db.get(id)
    },
    update: async (update: DeepPartial<Board>) => {
      return db.update(update)
    },
  }
}
