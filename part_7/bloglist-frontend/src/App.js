import { useState, useEffect, React, useRef } from "react"
import { useDispatch } from "react-redux"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import TestNotifications from "./components/TestNotifications"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Togglable from "./components/Togglable"
import "./app.css"
import { notify } from "./reducers/notificationReducer"

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()
  const dispatch = useDispatch()

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
      .then((blogs) => setBlogs(blogs))
      .catch((e) => {
        dispatch(notify("Couldn't fetch blogs from the server", -1))
        console.log("Coudn't fetch notes:", e)
      })
  }, [dispatch])

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
      dispatch(notify("Wrong username or password", -1))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log(`Logging out ${user.name}`)
    setUser(null)
    window.localStorage.removeItem("loggedUser")
    console.log("\tSuccess")
    dispatch(notify("Logged out successfully", 1))
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((response) => {
        noteFormRef.current.toggleVisibility()
        console.log("Add, response:", response)
        setBlogs(blogs.concat(response))
        dispatch(notify(`New blog added: ${blogObject.title}`, 1))
      })
      .catch((e) => {
        console.error("Adding a new blog failed:", e)
        dispatch(notify("New blog couldn't be added", -1))
      })
  }

  const replaceBlogs = (updatedBlog) => {
    // console.log("Replacing with", updatedBlog)
    const updatedBlogs = blogs.map((b) =>
      b.id === updatedBlog.id ? { ...b, likes: b.likes + 1 } : b
    )
    setBlogs(updatedBlogs)
  }

  const removeBlog = (blogToBeRemoved) => {
    const removeIndex = blogs
      .map((b) => b.id)
      .indexOf(blogToBeRemoved.id)
    const copy = blogs.map((b) => b)
    // eslint-disable-next-line no-unused-expressions
    removeIndex >= 0 && copy.splice(removeIndex, 1)
    setBlogs(copy)
  }

  if (user === null) {
    return (
      <div className="app">
        <Notification />
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
      <Notification />
      Logged in as {user.name}
      <button
        id="log-out-button"
        type="submit"
        onClick={handleLogout}
        style={{ marginLeft: "0.5em" }}
      >
        Log out
      </button>
      <h2>Blogs</h2>
      {blogs.sort(compareBlogs).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          replaceBlogs={replaceBlogs}
          removeBlog={removeBlog}
          user={user}
          uselessFunctionForTesting={() => {
            // console.log("UselessCalled")
          }}
        />
      ))}
      <Togglable buttonLabel="New blog" ref={noteFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </div>
  )
}

export default App
