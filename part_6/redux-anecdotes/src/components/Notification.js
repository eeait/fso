import { connect } from "react-redux"

const Notification = ({ notification }) => {
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
