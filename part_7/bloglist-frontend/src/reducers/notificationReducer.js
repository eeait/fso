import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    nature: 0,
    previousTimeoutId: null,
  },
  reducers: {
    setNotification(state, action) {
      clearTimeout(state.previousTimeoutId)
      const { payload } = action
      return {
        previousTimeoutId: payload.timeoutId,
        message: payload.message,
        nature: payload.nature,
      }
    },
    clearNotification(state, action) {
      return { ...state, message: "", nature: 0 }
    },
  },
})

export const notify = (message, nature) => async (dispatch) => {
  const timeoutId = setTimeout(() => {
    dispatch(clearNotification())
  }, 1000 * 5)
  dispatch(setNotification({ message, nature, timeoutId }))
}

export const { setNotification, clearNotification } =
  notificationSlice.actions

export default notificationSlice.reducer
