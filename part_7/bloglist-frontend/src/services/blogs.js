import axios from "axios"

const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = newToken
}

const createConfig = (token) => ({
  headers: { Authorization: `bearer ${token}` },
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlogObject) => {
  const config = createConfig(token)
  console.log(newBlogObject)
  console.log("TOKEN:", token)
  const response = await axios.post(baseUrl, newBlogObject, config)
  return response.data
}

const like = async (blogObject) => {
  const updatedBlog = {
    ...blogObject,
    likes: blogObject.likes + 1,
    user: blogObject.user.id,
  }

  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    updatedBlog
  )
  return response.data
}

const remove = async (blogObject) => {
  const config = createConfig(token)
  const response = await axios.delete(
    `${baseUrl}/${blogObject.id}`,
    config
  )
  return response.data
}

const comment = async (blog, comment) => {
  console.log(comment)
  const response = await axios.post(
    `${baseUrl}/${blog.id}/comments`,
    comment
  )
  return response.data
}

const methods = { getAll, create, like, remove, comment, setToken }

export default methods