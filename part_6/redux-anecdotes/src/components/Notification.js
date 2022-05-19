import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    border: "solid",
    padding: "0.5em",
    backgroundColor: "white",
  }

  if (notification !== "") {
    return <div style={style}>{notification}</div>
  }
  return
}

export default Notification
