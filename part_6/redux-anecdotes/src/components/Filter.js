import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div style={{ marginBottom: "0.5em" }}>
      Filter
      <input
        onChange={handleChange}
        style={{ marginLeft: "0.5em" }}
      />
    </div>
  )
}

export default Filter
