import { useState, useEffect, React } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: "",
    nature: "",
  })

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const notify = (message, nature, duration=5000) => {
    setNotification({ message, nature })
    setTimeout(() => {
      setNotification({ message: "", nature: "" })
    }, duration)
  }

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((e) => {
        notify("Couldn't fetch blogs from the server", "negative")
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("Logging in with", username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedUser", JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      console.log("\tSuccess")
    } catch (e) {
      console.log("Wrong credentials")
      notify("Wrong username or password", "negative")
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log(`Logging out ${user.name}`)
    setUser(null)
    window.localStorage.removeItem("loggedUser")
    console.log("\tSuccess")
    notify("Logged out successfully", "positive")
  }

  const addBlog = (event) => {
    event.preventDefault()
    console.log("Adding new blog")

    const blog = {
      title,
      author,
      url,
    }

    blogService
      .create(blog)
      .then((response) => {
        setBlogs(blogs.concat(response))
        notify(`New blog added: ${title}`, "positive")
        setTitle("")
        setAuthor("")
        setUrl("")
      })
      .catch((e) => {
        console.error("Adding a new blog failed:", e)
        notify("New blog couldn't be added", "negative")
      })
  }

  if (user === null) {
    return (
      <div>
        <Notification
          message={notification.message}
          nature={notification.nature}
        />
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification
        message={notification.message}
        nature={notification.nature}
      />
      Logged in as {user.name}
      <button type="submit" onClick={handleLogout}>
        Log out
      </button>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <h3>Add a new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default App
