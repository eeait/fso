import React, { useState } from "react"
import "./blog.css"
import { useDispatch, useSelector } from "react-redux"
import { deleteBlog, voteBlog } from "../reducers/blogReducer"

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = (event) => {
    event.preventDefault()
    setExpanded(!expanded)
  }

  const dispatch = useDispatch()
  const select = useSelector

  const user = select((state) => state.login)

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(voteBlog(blog))
  }

  const handleRemove = (event) => {
    event.preventDefault()
    // eslint-disable-next-line no-alert
    if (window.confirm(`Deleting "${blog.title}".`)) {
      dispatch(deleteBlog(blog))
    }
  }

  const buttonStyleAfterText = { marginLeft: "0.5em" }

  const viewButton = () => (
    <button
      id="view-blog-button"
      type="button"
      onClick={toggleExpanded}
      style={buttonStyleAfterText}
    >
      {expanded ? "Hide" : "View"}
    </button>
  )

  const likeButton = () => (
    <button
      id="like-button"
      type="submit"
      style={buttonStyleAfterText}
      onClick={handleLike}
    >
      Like
    </button>
  )

  const deleteButton = () => (
    <button
      id="delete-blog-button"
      type="submit"
      onClick={handleRemove}
    >
      Delete
    </button>
  )

  const details = () => (
    <div>
      {blog.url}
      <br />
      {blog.likes} likes{likeButton()}
      <br />
      Added by {blog.user.name}
      <br />
      {blog.user.username === user.username && deleteButton()}
    </div>
  )

  return (
    <div className="blog">
      <a href={blog.url}>{blog.title}</a> by {blog.author}
      {viewButton()}
      {!expanded || details()}
    </div>
  )
}

const Blogs = () => {
  const select = useSelector
  const blogs = select((state) => state.blogs)

  return (
    <div>
      <h2>Blogs</h2>
      {[...blogs]
        .sort((b1, b2) => b2.likes - b1.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

export default Blogs
