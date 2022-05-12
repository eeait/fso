import { forwardRef, useImperativeHandle, useState } from "react"

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} type="button">
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility} type="button">
          Cancel
        </button>
      </div>
    </div>
  )
})

export default Togglable
