/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react"

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <a href="#" style={padding}>
        Anecdotes
      </a>
      <a href="#" style={padding}>
        Create new
      </a>
      <a href="#" style={padding}>
        About
      </a>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>{anecdote.content}</li>
      ))}
    </ul>
  </div>
)
const About = () => (
  <div>
    <h2>About the Anecdote App</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual
      person or an incident. Occasionally humorous, anecdotes differ
      from jokes because their primary purpose is not simply to
      provoke laughter but to reveal a truth more general than the
      brief tale itself, such as to characterize a person by
      delineating a specific quirk or trait, to communicate an
      abstract idea about a person, place, or thing through the
      concrete details of a short narrative. An anecdote is &quot; a
      story with a point.&quot;
    </em>

    <p>
      Software engineering is full of excellent anecdotes, and with
      this app you can find the best ones and add your own.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://fullstackopen.com/">Full Stack Open</a>. See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
)

const CreateNew = ({ addNew }) => {
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [info, setInfo] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content,
      author,
      info,
      votes: 0,
    })
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          Author
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          URL for more info
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button type="button">create</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState("")

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} />
      <Footer />
    </div>
  )
}

export default App
