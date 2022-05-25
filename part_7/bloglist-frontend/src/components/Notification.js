import "./notification.css"
import { useSelector } from "react-redux"

const Notification = () => {
  const select = useSelector
  const [message, nature] = select(({ notification }) => [
    notification.message,
    notification.nature,
  ])

  if (message === "") {
    return null
  }

  const style = {
    "-1": "negative",
    0: "neutral",
    1: "positive",
  }

  return (
    <div className={`notification ${style[nature.toString()]}`}>
      {message}
    </div>
  )
}

export default Notification
