import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { initUsers } from "../reducers/userReducer"

const Users = () => {
  const select = useSelector
  const users = select((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>
              <b>User</b>
            </td>
            <td>
              <b>Blogs added</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {[...users].map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
