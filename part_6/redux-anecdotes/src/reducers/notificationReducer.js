import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      console.log("SET N")
      return action.payload
    },
    resetNotification(state, action) {
      console.log("RESET N")
      return ""
    },
  },
})

export const { setNotification, resetNotification } =
  notificationSlice.actions

export default notificationSlice.reducer
