import { useDispatch, useSelector } from "react-redux"
import { toggleVisibility } from "../reducers/togglableReducer"

const Togglable = ({ buttonLabel, children }) => {
  const dispatch = useDispatch()
  const select = useSelector
  const visibility = select((state) => state.togglable)

  const hideWhenVisible = { display: visibility ? "none" : "" }
  const showWhenVisible = { display: visibility ? "" : "none" }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          id="show-button"
          onClick={() => dispatch(toggleVisibility())}
          type="button"
        >
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button
          onClick={() => dispatch(toggleVisibility())}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

Togglable.displayName = "Togglable"

export default Togglable
