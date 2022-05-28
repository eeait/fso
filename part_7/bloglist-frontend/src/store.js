import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import loginReducer from "./reducers/loginReducer"
import togglableReducer from "./reducers/togglableReducer"
import userReducer from "./reducers/userReducer"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    login: loginReducer,
    togglable: togglableReducer,
    users: userReducer,
  },
})

export default store
