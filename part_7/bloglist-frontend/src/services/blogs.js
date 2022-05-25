import axios from "axios"

const baseUrl = "/api/blogs"

let token = null
// console.log("RESET TOKEN")

const setToken = (newToken) => {
  // console.log("UPDATE TOKEN")
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlogObject) => {
  const config = {
    headers: { Authorization: token },
  }
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
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(
    `${baseUrl}/${blogObject.id}`,
    config
  )
  return response.data
}

const methods = { getAll, create, like, remove, setToken }

export default methods
