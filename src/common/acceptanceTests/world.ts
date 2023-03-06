import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber"
import { DataStore } from "../db/testDB"
import axios from "axios"
import { Board } from "../../board/domain/board/board"
import { Story } from "../../story/domain/story"

export class CustomWorld extends World {
  boardDb: DataStore<Board>
  storyDb: DataStore<Story>
  url: string

  constructor(options: IWorldOptions) {
    super(options)
  }

  async post(endpoint: string, body: Record<string, any>) {
    return axios.post(this.url + endpoint, body)
  }

  async get(endpoint: string, params: Record<string, string> = {}) {
    return axios.get(this.url + endpoint, { params })
  }
}

setWorldConstructor(CustomWorld)
