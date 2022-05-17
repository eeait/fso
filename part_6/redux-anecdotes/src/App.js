import { useSelector, useDispatch } from "react-redux"
import { vote } from "./reducers/anecdoteReducer"
import "./app.css"

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  // const vote = (id) => {
  //   console.log("Voting", id)
  //   dispatch(vote(id))
  // }

  return (
    <div className="app">
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
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
      <h2>Create new</h2>
      <form>
        <div>
          <input />
        </div>
        <button>Create</button>
      </form>
    </div>
  )
}

export default App
