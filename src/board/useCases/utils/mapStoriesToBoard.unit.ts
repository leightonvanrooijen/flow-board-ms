import { fakeBoard } from "../../domain/board/board.fake"
import { fakeColumns } from "../../domain/column/column.fake"
import { fakeStories } from "../../../story/domain/story.fake"
import { mapStoriesToBoard } from "./mapStoriesToBoard"

describe("mapStoriesToBoard", () => {
  it("maps the stories to board columns based on the ids", () => {
    const columnFakes = fakeColumns(2, [{ storyIds: ["1"] }, { storyIds: ["1", "2"] }])
    const boardFake = fakeBoard({ columns: columnFakes })
    const storyFakes = fakeStories(2, [{ id: "1" }, { id: "2" }])

    const board = mapStoriesToBoard(boardFake, storyFakes)

    // second column has both stories in same order
    expect(board.columns[1].stories).toEqual(storyFakes)
  })
  it("throws if there is a id without a corresponding story", () => {
    const columnFakes = fakeColumns(2, [{ storyIds: ["1"] }, { storyIds: ["1", "2"] }])
    const boardFake = fakeBoard({ columns: columnFakes })

    const board = () => mapStoriesToBoard(boardFake, [])

    // second column has both stories in same order
    expect(board).toThrow()
  })
})
