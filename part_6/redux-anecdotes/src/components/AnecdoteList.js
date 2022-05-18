import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import Filter from "./Filter"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {[...anecdotes]
        .sort((a1, a2) => a2.votes - a1.votes)
        .map((anecdote) => (
          <div key={anecdote.id} className="anecdote">
            <div>{anecdote.content}</div>
            <div>
              {anecdote.votes} votes
              <button
                onClick={() => {
                  dispatch(vote(anecdote.id))
                  dispatch(
                    setNotification(
                      `Anecdote voted: ${anecdote.content}`
                    )
                  )
                }}
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
