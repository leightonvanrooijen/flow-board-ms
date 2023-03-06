import { TestDB } from "../../common/db/testDB"
import { Board } from "../domain/board/board"
import { buildBoardRepo } from "../repo/boardRepo"
import { buildGetBoard } from "./getBoard"
import { fakeBoard } from "../domain/board/board.fake"
import { fakeStories } from "../../story/domain/story.fake"
import { buildBoardStoryRepo } from "../repo/storyRepo"
import { fakeColumns } from "../domain/column/column.fake"
import { BoardStory } from "./utils/mapStoriesToBoard"

const setUp = (dbData: Board[] = [], storyFakes: BoardStory[] = fakeStories(2)) => {
  const db = new TestDB<Board>(dbData, "id")
  const repo = buildBoardRepo({ db })

  const getStories = jest.fn((ids) => Promise.resolve(storyFakes))
  const storyRepo = buildBoardStoryRepo({ getStories })

  const getBoard = buildGetBoard({ repo, storyRepo })

  return { getBoard }
}

describe("getColumn", () => {
  it("should return the board matching the ID provided", async () => {
    // these tests are coupled to mapStoriesToBoard to board, but I think it's better that way
    const columnFakes = fakeColumns(2, [{ storyIds: ["1"] }, { storyIds: ["1", "2"] }])
    const boardFake = fakeBoard({ columns: columnFakes })
    const storyFakes = fakeStories(2, [{ id: "1" }, { id: "2" }])

    const { getBoard } = setUp([boardFake], storyFakes)

    const board = await getBoard(boardFake.id)

    expect(board.id).toEqual(boardFake.id)
  })
  it("must have an id provided", async () => {
    const { getBoard } = setUp()

    const board = async () => getBoard(undefined)

    await expect(board).rejects.toThrow()
  })
  it("throws an error if a board matching the id provided doesn't exist", async () => {
    const { getBoard } = setUp()

    const board = async () => getBoard("sbsk")

    await expect(board).rejects.toThrow()
  })
  it("should have the story information attached to each column", async () => {
    const columnFakes = fakeColumns(2, [{ storyIds: ["1"] }, { storyIds: ["1", "2"] }])
    const boardFake = fakeBoard({ columns: columnFakes })
    const storyFakes = fakeStories(2, [{ id: "1" }, { id: "2" }])

    const { getBoard } = setUp([boardFake], storyFakes)

    const board = await getBoard(boardFake.id)

    expect(board.columns[1].stories).toEqual(storyFakes)
  })
})
