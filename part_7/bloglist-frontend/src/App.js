import { useEffect, React } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, Link, Navigate } from "react-router-dom"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Blogs from "./components/Blogs"
import Users from "./components/Users"
import User from "./components/User"
import MainBlog from "./components/MainBlog"
import "./app.css"
import { initLogin } from "./reducers/loginReducer"
import { initUsers } from "./reducers/userReducer"
import { initBlogs } from "./reducers/blogReducer"
import Menu from "./components/Menu"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initLogin())
    dispatch(initUsers())
    dispatch(initBlogs())
  }, [dispatch])

  const select = useSelector
  const user = select((state) => state.login)

  return (
    <div className="app">
      <h1>The Blog App</h1>
      <Notification />
      <LoginForm />
      {user && (
        <div>
          <Menu />
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<MainBlog />} />
          </Routes>
        </div>
      )}
      <p>A blog list app made by Eemil. </p>
    </div>
  )
}

export default App
