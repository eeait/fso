import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { notify } from "./notificationReducer"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter((b) => action.payload.id !== b.id)
    },
    likeBlog(state, action) {
      return state.map((b) =>
        b.id === action.payload.id ? { ...b, likes: b.likes + 1 } : b
      )
    },
  },
})

export const initBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = (blog) => async (dispatch) => {
  const newBlog = await blogService.create(blog)
  dispatch(appendBlog(newBlog))
  dispatch(notify(`New blog added: ${blog.title}`, 1))
}

export const deleteBlog = (blog) => (dispatch) => {
  console.log(blog)
  blogService.remove(blog).then((r) => {
    dispatch(removeBlog(blog))
  })
}

export const voteBlog = (blog) => (dispatch) => {
  console.log("LIKE", blog)
  blogService
    .like(blog)
    .then((likedBlog) => {
      dispatch(likeBlog(likedBlog))
    })
    .catch((e) => {
      dispatch(notify("Couldn't like blog", -1))
    })
}

export const { setBlogs, appendBlog, removeBlog, likeBlog } =
  blogSlice.actions

export default blogSlice.reducer
