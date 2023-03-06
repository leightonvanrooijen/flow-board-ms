import { Application, Request, Response } from "express"
import { GetStories } from "../useCases/getStories"

export const getStoriesApi = ({ app, getStories }: { app: Application; getStories: GetStories }) => {
  app.get("/stories", async (req: Request, res: Response) => {
    try {
      if (typeof req.query.ids !== "string") throw new Error("ids must be a string")

      const idArray = req.query.ids.split(",")
      const stories = await getStories(idArray)
      res.status(200).send({ data: stories })
    } catch (e) {
      res.status(400).send({ data: e.message })
    }
  })
}
