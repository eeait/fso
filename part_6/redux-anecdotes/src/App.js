import "./app.css"
import Notification from "./components/Notification"
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"

const App = () => {
  return (
    <div className="app">
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App