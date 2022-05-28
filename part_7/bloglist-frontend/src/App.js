import { useState, useEffect, React, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Blogs from "./components/Blogs"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import "./app.css"
import { createBlog, initBlogs } from "./reducers/blogReducer"
import { initLogin, login, logout } from "./reducers/loginReducer"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const select = useSelector

  const user = select((state) => state.login)

  useEffect(() => {
    dispatch(initLogin())
    dispatch(initBlogs())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername("")
    setPassword("")
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
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
