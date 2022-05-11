import React from "react"
import "./notification.css"

const Notification = ({ message, nature }) => {
  if (message === "") {
    return null
  }
  return <div className={`notification ${nature}`}>{message}</div>
}

export default Notification
