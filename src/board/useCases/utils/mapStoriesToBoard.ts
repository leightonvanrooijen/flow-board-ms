import { Board } from "../../domain/board/board"
import { StoryTypes } from "../../../story/domain/story"
import { faker } from "@faker-js/faker"
import { makeFakes } from "../../../common/makeFakes"
import { fakeStories } from "../../../story/domain/story.fake"

export type BoardStory = {
  id: string
  title: string
  type: StoryTypes
}

export type ApiColumn = {
  name: string
  stories: BoardStory[]
}

export type ApiBoard = {
  id: string
  name: string
  columns: ApiColumn[]
}

export const fakeApiColumn = (overwrites?: Partial<ApiColumn>): ApiColumn => {
  return {
    name: faker.company.bsBuzz(),
    stories: fakeStories(2),
    ...overwrites,
  }
}

export const fakeApiColumns = makeFakes(fakeApiColumn)

export const fakeApiBoard = (overwrites?: Partial<ApiBoard>): ApiBoard => {
  return {
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    columns: fakeApiColumns(3),
    ...overwrites,
  }
}

const findMatchingStories = (storyIds: string[], stories: BoardStory[]) => {
  return storyIds.map((id) => {
    const story = stories.find((story) => story.id === id)
    if (!story) throw new Error("Could not find the story matching the id")

    return story
  })
}

export const mapStoriesToBoard = (board: Board, stories: BoardStory[]): ApiBoard => {
  const columns = board.columns.map((column) => {
    return {
      name: column.name,
      stories: findMatchingStories(column.storyIds, stories),
    }
  })

  return {
    ...board,
    columns,
  }
}
