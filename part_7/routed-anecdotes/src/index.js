/* eslint-disable react/jsx-filename-extension */
import React from "react"
import ReactDOM from "react-dom/client"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
)