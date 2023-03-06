import { TestDB } from "../../common/db/testDB"
import { Board } from "../domain/board/board"
import { buildBoardRepo } from "./boardRepo"
import { fakeBoard } from "../domain/board/board.fake"

const setUp = ({ dbData }: { dbData?: Board[] } = {}) => {
  const db = new TestDB<Board>(dbData ?? [], "id")
  const boardRepo = buildBoardRepo({ db })

  return { boardRepo, db }
}

describe("buildBoardRepo", () => {
  describe("create", () => {
    it("should create a Board in the data store", async () => {
      const { boardRepo, db } = setUp()
      const board = fakeBoard()

      await boardRepo.create(board)

      expect(await db.get(board.id)).toEqual(board)
    })
  })
  describe("get", () => {
    it("should get a Board matching the id provided", async () => {
      const boardFake = fakeBoard()
      const { boardRepo } = setUp({ dbData: [boardFake] })

      const board = await boardRepo.get(boardFake.id)

      expect(board).toEqual(boardFake)
    })
    it("should throw if no board exists for the id", async () => {
      const { boardRepo } = setUp()

      const board = async () => boardRepo.get("dfs")

      await expect(board).rejects.toThrow()
    })
  })
  describe("update", () => {
    it("should get a update the board with the matching id", async () => {
      const boardFake = fakeBoard()
      const { boardRepo } = setUp({ dbData: [boardFake] })

      const nameUpdate = "name"
      const board = await boardRepo.update({ id: boardFake.id, name: nameUpdate })

      expect(board.name).toEqual(nameUpdate)
    })
    it("should throw if no board exists for the id", async () => {
      const { boardRepo } = setUp()

      const board = async () => boardRepo.update({ id: "jhsk" })

      await expect(board).rejects.toThrow()
    })
  })
})
