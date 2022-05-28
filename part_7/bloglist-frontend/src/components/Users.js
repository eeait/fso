import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initUsers } from "../reducers/userReducer"

const Users = () => {
  const select = useSelector
  const users = select((state) => state.users)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

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
              <td>{u.name}</td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
