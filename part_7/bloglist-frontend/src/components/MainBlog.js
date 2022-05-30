import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { voteBlog } from "../reducers/blogReducer"
import CommentSection from "./CommentSection"

const MainBlog = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const select = useSelector
  const blog = select((state) => state.blogs.find((b) => b.id === id))

  if (!blog) return null

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(voteBlog(blog))
  }

  const likeButton = () => (
    <button
      id="like-button"
      type="submit"
      style={{ marginLeft: "0.5em" }}
      onClick={handleLike}
    >
      Like
    </button>
  )

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes {likeButton()}
      <br />
      Added by {blog.user.name}
      <CommentSection blog={blog} />
    </div>
  )
}

export default MainBlog
