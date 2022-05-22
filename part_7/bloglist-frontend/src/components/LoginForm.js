const LoginForm = ({
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => (
  <div>
    <h3>Log in</h3>
    <form onSubmit={handleSubmit}>
      <div>
        Username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        Password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit">
        Log in
      </button>
    </form>
  </div>
)

export default LoginForm
