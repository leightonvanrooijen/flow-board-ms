export const storyTypes = ["unknown", "feature", "defect", "risk", "debt"] as const
export type StoryTypes = typeof storyTypes[number]

export type Story = {
  id: string
  title: string
  type: StoryTypes
}

export type MakeStory = typeof makeStory

const errorMessage = "An Story must have a "

export const makeStory = ({ id, title, type }: Story): Story => {
  if (!id) {
    throw new Error(errorMessage + "id")
  }

  if (!title) {
    throw new Error(errorMessage + "title")
  }

  return {
    id: id,
    title: title,
    type: type ? type : "unknown",
  }
}
