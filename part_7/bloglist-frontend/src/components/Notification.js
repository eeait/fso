import "./notification.css"
import PropTypes from "prop-types"

const Notification = ({ message, nature }) => {
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

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  nature: PropTypes.number.isRequired,
}

export default Notification
