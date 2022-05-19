import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    resetNotification(state, action) {
      return ""
    },
  },
})

export const notify = (message, duration) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 1000 * duration)
  }
}

export const { setNotification, resetNotification } =
  notificationSlice.actions

export default notificationSlice.reducer
