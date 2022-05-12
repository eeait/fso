import { useState, useEffect, React } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: "",
    nature: 0,
  })

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const notify = (message, nature = 0, duration = 5000) => {
    setNotification({ message, nature })
    setTimeout(() => {
      setNotification({ message: "", nature: 0 })
    }, duration)
  }

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((e) => {
        notify("Couldn't fetch blogs from the server", -1)
        console.log("Coudn't fetch notes:", e)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
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
      notify("Wrong username or password", -1)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log(`Logging out ${user.name}`)
    setUser(null)
    window.localStorage.removeItem("loggedUser")
    console.log("\tSuccess")
    notify("Logged out successfully", 1)
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
        notify(`New blog added: ${title}`, 1)
        setTitle("")
        setAuthor("")
        setUrl("")
      })
      .catch((e) => {
        console.error("Adding a new blog failed:", e)
        notify("New blog couldn't be added", -1)
      })
  }

  if (user === null) {
    return (
      <div>
        <Notification
          message={notification.message}
          nature={notification.nature}
        />
        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) =>
            setUsername(target.value)
          }
          handlePasswordChange={({ target }) =>
            setPassword(target.value)
          }
        />
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
      <Togglable buttonLabel="New blog">
        <BlogForm
          handleSubmit={addBlog}
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
        />
      </Togglable>
    </div>
  )
}

export default App
