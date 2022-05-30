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
    addComment(state, action) {
      return state.map((b) =>
        b.id === action.payload.id
          ? { ...b, comments: action.payload.comments }
          : b
      )
    },
  },
})

export const initBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = (blog) => (dispatch) => {
  blogService
    .create(blog)
    .then((response) => {
      dispatch(appendBlog(response))
      dispatch(notify(`New blog added: ${blog.title}`, 1))
    })
    .catch((e) => {
      dispatch(notify(`Error adding a blog`, -1))
    })
}

export const deleteBlog = (blog) => (dispatch) => {
  blogService.remove(blog).then((r) => {
    dispatch(removeBlog(blog))
  })
}

export const voteBlog = (blog) => (dispatch) => {
  blogService
    .like(blog)
    .then((likedBlog) => {
      dispatch(likeBlog(likedBlog))
    })
    .catch((e) => {
      dispatch(notify("Couldn't like blog", -1))
    })
}

export const commentBlog = (blog, comment) => (dispatch) => {
  blogService
    .comment(blog, { comment })
    .then((commentedBlog) => {
      dispatch(addComment(commentedBlog))
    })
    .catch((e) => {
      dispatch(notify("Couldn't add comment", -1))
    })
}

export const {
  setBlogs,
  appendBlog,
  removeBlog,
  likeBlog,
  addComment,
} = blogSlice.actions

export default blogSlice.reducer
