import axios from "axios"
import { getId } from "../reducers/anecdoteReducer"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const newObject = {
    content,
    id: getId(),
    votes: 0,
  }
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const vote = async (anecdote) => {
  const replacer = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, replacer)
  return response.data
}

const methods = { getAll, create, vote }
export default methods
