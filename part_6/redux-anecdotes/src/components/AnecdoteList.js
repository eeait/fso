import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a1, a2) => a2.votes - a1.votes)
        .map((anecdote) => (
          <div key={anecdote.id} className="anecdote">
            <div>{anecdote.content}</div>
            <div>
              {anecdote.votes} votes
              <button
                onClick={() => dispatch(vote(anecdote.id))}
                style={{ marginLeft: "0.5em" }}
              >
                Vote
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
