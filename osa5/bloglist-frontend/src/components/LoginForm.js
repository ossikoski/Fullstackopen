import React from 'react'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return(
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='usernameInput'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <br></br>
        password
        <input
          id='passwordInput'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="loginButton" type="submit">login</button>
    </form>
  )
}

export default LoginForm