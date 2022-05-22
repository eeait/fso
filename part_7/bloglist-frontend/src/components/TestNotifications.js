const TestNotifications = ({ notify }) => (
  <div>
    Test Notifications
    <button
      type="button"
      onClick={() => notify("Test Notification", 1, 60000)}
    >
      Positive
    </button>
    <button
      type="button"
      onClick={() => notify("Test Notification", -1, 60000)}
    >
      Negative
    </button>
    <button
      type="button"
      onClick={() => notify("Test Notification", 0, 60000)}
    >
      Neutral
    </button>
  </div>
)

export default TestNotifications
