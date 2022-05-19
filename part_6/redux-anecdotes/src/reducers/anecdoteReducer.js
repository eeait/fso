/* eslint-disable no-fallthrough */

import anecdoteService from "../services/anecdotes"

export const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id
      const anecdoteToBeChanged = state.find((a) => a.id === id)
      const changedAnecdote = {
        ...anecdoteToBeChanged,
        votes: anecdoteToBeChanged.votes + 1,
      }
      return state.map((a) => (a.id === id ? changedAnecdote : a))
    case "APPEND":
      return state.concat(action.data)
    case "SET_ANECDOTES":
      return action.data
    default:
      return state
  }
}

const vote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(vote(votedAnecdote.id))
  }
}

const append = (anecdote) => {
  return {
    type: "APPEND",
    data: anecdote,
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch(append(newAnecdote))
  }
}

const setAnecdotes = (anecdotes) => {
  return {
    type: "SET_ANECDOTES",
    data: anecdotes,
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default reducer
