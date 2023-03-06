import { GetStory } from "../useCases/getStory"
import { Application, Request, Response } from "express"

export const getStoryApi = ({ app, getStory }: { app: Application; getStory: GetStory }) => {
  app.get("/story/:id", async (req: Request, res: Response) => {
    try {
      const story = await getStory(req.params.id)
      res.status(200).send({ data: story })
    } catch (e) {
      res.status(400).send({ data: e.message })
    }
  })
}
