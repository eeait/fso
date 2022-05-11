import React from "react"

const Blog = ({ blog }) => (
  <div>
    <a href={blog.url}>{blog.title}</a> by {blog.author}
  </div>
)

export default Blog