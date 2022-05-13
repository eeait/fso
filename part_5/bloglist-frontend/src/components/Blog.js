import React, { useState } from "react"
import "./blog.css"
import blogService from "../services/blogs"

const Blog = ({ blog, notify, replaceBlogs }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = (event) => {
    event.preventDefault()
    setExpanded(!expanded)
  }

  const handleLike = (event) => {
    event.preventDefault()
    blogService
      .like(blog)
      .then((response) => {
        replaceBlogs(response)
      })
      .catch((e) => {
        notify("Couldn't like blog", -1)
      })
  }

  const buttonStyle = { marginLeft: "0.5em" }

  const viewButton = () => (
    <button
      type="button"
      onClick={toggleExpanded}
      style={buttonStyle}
    >
      {expanded ? "Hide" : "View"}
    </button>
  ) 
  const details = () => (
    <div>
      {blog.url}
      <br />
      {blog.likes} likes
      <button type="button" style={buttonStyle} onClick={handleLike}>
        Like
      </button>
      <br />
      Added by {blog.user.name}
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

export default Blog
