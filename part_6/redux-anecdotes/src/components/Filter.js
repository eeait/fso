import { connect } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value)
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

const mapDispatchToProps = {
  setFilter,
}

const ConnectedFilter = connect(undefined, mapDispatchToProps)(Filter)
export default ConnectedFilter
