import { useEffect, React } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, Link } from "react-router-dom"

import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Blogs from "./components/Blogs"
import "./app.css"
import { initBlogs } from "./reducers/blogReducer"
import { initLogin } from "./reducers/loginReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initLogin())
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
        <Routes>
          <Route path="/" element={<Blogs />} />
          {/* <Route path="/users" element={<Users />} /> */}
        </Routes>
      )}
      <p>A blog list app made by Eemil. </p>
    </div>
  )
}

export default App
