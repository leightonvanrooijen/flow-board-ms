import { faker } from "@faker-js/faker"
import { Column } from "./column"
import { makeFakes } from "../../../common/makeFakes"

export const fakeColumn = (overwrites?: Partial<Column>): Column => {
  return {
    name: faker.company.bsBuzz(),
    storyIds: Array.from({ length: 3 }, faker.datatype.uuid),
    ...overwrites,
  }
}

export const fakeColumns = makeFakes(fakeColumn)
