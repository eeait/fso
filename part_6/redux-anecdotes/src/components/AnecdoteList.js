import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"
import Filter from "./Filter"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    return () => {
      dispatch(voteAnecdote(anecdote))
      dispatch(notify(`Anecdote voted: ${anecdote.content}`, 1))
    }
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {[...anecdotes]
        .sort((a1, a2) => a2.votes - a1.votes)
        .map((anecdote) => (
          <div key={anecdote.id} className="anecdote">
            <div>{anecdote.content}</div>
            {anecdote.votes} votes
            <button
              onClick={handleVote(anecdote)}
              style={{ marginLeft: "0.5em" }}
            >
              Vote
            </button>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
