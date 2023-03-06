import { faker } from "@faker-js/faker"
import { Board } from "./board"
import { fakeColumns } from "../column/column.fake"

export const fakeBoard = (overwrites?: Partial<Board>): Board => {
  return {
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    columns: fakeColumns(3),
    ...overwrites,
  }
}
