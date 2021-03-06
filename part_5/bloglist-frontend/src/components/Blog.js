import React, { useState } from "react"
import "./blog.css"
import PropTypes from "prop-types"
import blogService from "../services/blogs"

const Blog = ({
  blog,
  notify,
  replaceBlogs,
  removeBlog,
  user,
  uselessFunctionForTesting,
}) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = (event) => {
    event.preventDefault()
    setExpanded(!expanded)
  }

  const handleLike = (event) => {
    event.preventDefault()
    uselessFunctionForTesting()
    blogService
      .like(blog)
      .then((response) => {
        replaceBlogs(response)
      })
      .catch((e) => {
        notify("Couldn't like blog", -1)
      })
  }

  const handleRemove = (event) => {
    event.preventDefault()
    // eslint-disable-next-line no-alert
    const sure = window.confirm(`Deleting "${blog.title}".`)
    if (sure) {
      blogService.setToken(user.token)
      blogService
        .remove(blog)
        .then((res) => {
          console.log(res)
          removeBlog(blog)
        })
        .catch((e) => {
          notify("Couldn't remove blog")
          console.log(e)
        })
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired,
  replaceBlogs: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
