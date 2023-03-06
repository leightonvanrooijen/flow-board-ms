import { makeColumn } from "./column"
import { fakeColumn } from "./column.fake"

describe("makeColumn", () => {
  it("must have a name", () => {
    const fakeInput = fakeColumn({ name: "" })
    const column = () => makeColumn(fakeInput)

    expect(column).toThrow()
  })
})
