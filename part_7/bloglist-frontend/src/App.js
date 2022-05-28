import { useState, useEffect, React, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Blogs from "./components/Blogs"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Togglable from "./components/Togglable"
import "./app.css"
import { notify } from "./reducers/notificationReducer"
import { createBlog, initBlogs } from "./reducers/blogReducer"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
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
    dispatch(createBlog(blogObject))
    blogFormRef.current.toggleVisibility()
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
      <Blogs user={user} addBlog={addBlog} />
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </div>
  )
}

export default App
