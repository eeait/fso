import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const User = () => {
  const { id } = useParams()

  const select = useSelector
  const user = select((state) => state.users.find((u) => u.id === id))

  if (!user) return null

  return (
    <div>
      <h2>
        {user.name} (@{user.username})
      </h2>
      <h3>Blogs added by this user</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
