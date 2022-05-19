import "./app.css"
import Notification from "./components/Notification"
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { initAnecdotes } from "./reducers/anecdoteReducer"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])

  return (
    <div className="app">
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

console.log()

export default App
