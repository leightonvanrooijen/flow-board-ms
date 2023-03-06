import { Column, MakeColum } from "../column/column"

export type Board = {
  id: string
  name: string
  columns: Column[]
}

export type MakeBoard = ReturnType<typeof buildMakeBoard>

export const buildMakeBoard = ({ makeColumn, uuid }: { makeColumn: MakeColum; uuid: () => string }) => {
  return function makeBoard({ id, name, columns }: Board): Board {
    if (!name) {
      throw new Error("A Board must have a name")
    }

    if (!columns || columns.length < 1) {
      throw new Error("A Board must at least one Column")
    }

    const domainColumns = columns.map((column) => makeColumn(column))

    return {
      id: id ?? uuid(),
      name,
      columns: domainColumns,
    }
  }
}
