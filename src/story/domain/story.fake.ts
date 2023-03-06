import { faker } from "@faker-js/faker"
import { Story, storyTypes } from "./story"
import { makeFakes } from "../../common/makeFakes"

export const fakeStory = (overwrites?: Partial<Story>): Story => {
  return {
    id: faker.datatype.uuid(),
    title: faker.commerce.productDescription(),
    type: faker.helpers.arrayElement([...storyTypes]),
    ...overwrites,
  }
}

export const fakeStories = makeFakes(fakeStory)
