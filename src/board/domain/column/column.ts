export type Column = {
  name: string
  storyIds: string[]
}

export type MakeColum = typeof makeColumn

export const makeColumn = ({ name, storyIds }: Column): Column => {
  if (!name) {
    throw new Error("A Column must have a name")
  }

  return {
    name,
    storyIds,
  }
}
