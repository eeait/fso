import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)

  const handleSubmit = (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url,
    }
    blog.likes = 0
    createBlog(blog)
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <h3>Add a new blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
            placeholder="Title"
          />
        </div>
        <div>
          Author
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
            placeholder="Author"
          />
        </div>
        <div>
          URL
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
            placeholder="URL"
          />
        </div>
        <button id="add-button" type="submit">
          Add
        </button>
      </form>
    </div>
  )
}

export default BlogForm
