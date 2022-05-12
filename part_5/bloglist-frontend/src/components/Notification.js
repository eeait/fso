import React from "react"
import "./notification.css"

const Notification = ({ message, nature }) => {
  if (message === "") {
    return null
  }
  const style = {
    "-1": "negative",
    0: "",
    1: "positive",
  }

  return <div className={`notification ${style[nature.toString()]}`}>{message}</div>
}

export default Notification
