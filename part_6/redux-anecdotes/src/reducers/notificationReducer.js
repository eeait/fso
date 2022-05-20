import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: "",
    previousTimeoutId: null,
  },
  reducers: {
    setNotification(state, action) {
      clearTimeout(state.previousTimeoutId)
      const { payload } = action
      return {
        previousTimeoutId: payload.timeoutId,
        notification: payload.message,
      }
    },
    resetNotification(state, action) {
      return { ...state, notification: "" }
    },
  },
})

export const notify = (message, duration) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch(resetNotification())
    }, 1000 * duration)
    dispatch(setNotification({ message, timeoutId }))
  }
}

export const { setNotification, resetNotification } =
  notificationSlice.actions

export default notificationSlice.reducer
