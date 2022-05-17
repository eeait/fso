import "./app.css"
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"

const App = () => {
  return (
    <div className="app">
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App