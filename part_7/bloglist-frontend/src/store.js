import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import loginReducer from "./reducers/loginReducer"
import togglableReducer from "./reducers/togglableReducer"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    login: loginReducer,
    togglable: togglableReducer,
  },
})

export default store
