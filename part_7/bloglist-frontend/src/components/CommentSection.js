import { useState } from "react"
import { useDispatch } from "react-redux"
import { commentBlog } from "../reducers/blogReducer"

const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment))
    setComment("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Add a comment
          <input
            style={{ marginLeft: "0.5em" }}
            id="comment"
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
            placeholder="How cool!"
          />
          <button id="send-button" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

const CommentSection = ({ blog }) => {
  const pi = 2
  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <CommentForm blog={blog}/>
    </div>
  )
}

export default CommentSection
