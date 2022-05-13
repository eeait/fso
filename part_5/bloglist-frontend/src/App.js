import { useState, useEffect, React, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Togglable from "./components/Togglable"
import "./app.css"

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: "",
    nature: 0,
  })

  const noteFormRef = useRef()

  const notify = (message, nature = 0, duration = 5000) => {
    setNotification({ message, nature })
    setTimeout(() => {
      setNotification({ message: "", nature: 0 })
    }, duration)
  }

  const compareBlogs = (b1, b2) => {
    if (b1.likes > b2.likes) {
      return -1
    }
    if (b1.likes < b2.likes) {
      return 1
    }
    return 0
  }

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort(compareBlogs)))
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

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((response) => {
        noteFormRef.current.toggleVisibility()
        setBlogs(blogs.concat(response).sort(compareBlogs))
        notify(`New blog added: ${blogObject.title}`, 1)
      })
      .catch((e) => {
        console.error("Adding a new blog failed:", e)
        notify("New blog couldn't be added", -1)
      })
  }

  const replaceBlogs = (updatedBlog) => {
    // console.log("Replacing with", updatedBlog)
    const updatedBlogs = blogs.map((b) =>
      b.id === updatedBlog.id ? updatedBlog : b
    )
    setBlogs(updatedBlogs.sort(compareBlogs))
  }

  if (user === null) {
    return (
      <div className="app">
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
    <div className="app">
      <Notification
        message={notification.message}
        nature={notification.nature}
      />
      Logged in as {user.name}
      <button
        type="submit"
        onClick={handleLogout}
        style={{ marginLeft: "0.5em" }}
      >
        Log out
      </button>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          notify={notify}
          replaceBlogs={replaceBlogs}
        />
      ))}
      <Togglable buttonLabel="New blog" ref={noteFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </div>
  )
}

export default App
