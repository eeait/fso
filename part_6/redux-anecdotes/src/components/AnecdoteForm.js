import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  const handleAddAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    props.createAnecdote(content)
    props.notify(`Anecdote added: ${content}`, 1)
  }

  return (
    <div>
      <h2>Add anecdote</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  notify,
}

const ConnectedAnecdoteForm = connect(
  undefined,
  mapDispatchToProps
)(AnecdoteForm)
export default ConnectedAnecdoteForm
