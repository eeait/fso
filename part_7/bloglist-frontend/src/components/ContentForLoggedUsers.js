import { useSelector } from "react-redux"
import BlogForm from "./BlogForm"
import Blogs from "./Blogs"
import Togglable from "./Togglable"

const ContentForLoggedUsers = () => {
  const select = useSelector

  const user = select((state) => state.login)
  if (!user) {
    return <div />
  }

  return (
    <div>
      <Blogs />
      <Togglable buttonLabel="New blog">
        <BlogForm />
      </Togglable>
    </div>
  )
}

export default ContentForLoggedUsers
