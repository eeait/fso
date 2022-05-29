import { Link } from "react-router-dom"

const Menu = () => {
  const style = {
    padding: "0.2em",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    margin: "0.2em",
    borderStyle: "solid",
    borderRadius: "0.2em",
    backgroundColor: "#F569B2",
    color: "black",
    borderColor: "black",
  }
  return (
    <div>
      <Link style={style} to="/">
        Blogs
      </Link>
      <Link style={style} to="/users">
        Users
      </Link>
    </div>
  )
}

export default Menu
