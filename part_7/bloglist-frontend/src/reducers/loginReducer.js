import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { notify } from "./notificationReducer"

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    resetUser(state, action) {
      return null
    },
  },
})

export const initLogin = () => async (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem("loggedUser")
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    dispatch(setUser(user))
    blogService.setToken(user.token)
  }
}

export const login = (username, password) => async (dispatch) => {
  console.log("LOGGING in with", username, password)
  try {
    const user = await loginService.login({
      username,
      password,
    })
    window.localStorage.setItem("loggedUser", JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
    console.log("\tSuccess")
  } catch (e) {
    console.error("Login failed", e)
    dispatch(notify("Login failed", -1))
  }
}

export const logout = () => async (dispatch) => {
  dispatch(resetUser())
  window.localStorage.removeItem("loggedUser")
  dispatch(notify("Logged out successfully", 1))
}

export const { setUser, resetUser } = loginSlice.actions

export default loginSlice.reducer
