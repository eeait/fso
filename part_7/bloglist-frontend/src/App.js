import { useEffect, React } from "react"
import { useDispatch } from "react-redux"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import "./app.css"
import { initBlogs } from "./reducers/blogReducer"
import { initLogin } from "./reducers/loginReducer"
import ContentForLoggedUsers from "./components/ContentForLoggedUsers"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initLogin())
    dispatch(initBlogs())
  }, [dispatch])

  return (
    <div className="app">
      <Notification />
      <LoginForm />
      <ContentForLoggedUsers />
    </div>
  )
}

export default App
