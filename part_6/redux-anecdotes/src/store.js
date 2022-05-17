import { configureStore } from "@reduxjs/toolkit"
import anecdotesReducer from "./reducers/anecdoteReducer"

const store = configureStore({ reducer: anecdotesReducer })

export default store