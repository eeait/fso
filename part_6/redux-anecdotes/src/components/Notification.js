import { useDispatch, useSelector } from "react-redux"
import { resetNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    border: "solid",
    padding: "0.5em",
    backgroundColor: "white",
  }

  const dispatch = useDispatch()
  if (notification !== "") {
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
    return <div style={style}>{notification}</div>
  }
  return
}

export default Notification
