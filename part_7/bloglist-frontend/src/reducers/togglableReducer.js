import { createSlice } from "@reduxjs/toolkit"

const togglableSlice = createSlice({
  name: "visibility",
  initialState: false,
  reducers: {
    toggleVisibility(state, action) {
      return !state
    },
  },
})

export const { toggleVisibility } = togglableSlice.actions

export default togglableSlice.reducer
