import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../reducers/loginReducer"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const select = useSelector
  const dispatch = useDispatch()

  const user = select((state) => state.login)

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername("")
    setPassword("")
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  if (!user) {
    return (
      <div>
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => {
                setUsername(target.value)
              }}
            />
          </div>
          <div>
            Password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => {
                setPassword(target.value)
              }}
            />
          </div>
          <button id="login-button" type="submit">
            Log in
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      Logged in as {user.name}
      <button
        id="log-out-button"
        type="submit"
        onClick={handleLogout}
        style={{ marginLeft: "0.5em" }}
      >
        Log out
      </button>
    </div>
  )
}

export default LoginForm
