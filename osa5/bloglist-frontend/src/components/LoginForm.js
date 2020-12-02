import React from 'react'
import { Form, Button } from 'react-bootstrap'


const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return(
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <input
            id='usernameInput'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <br></br>
          <Form.Label>password:</Form.Label>
          <input
            id='passwordInput'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <br></br>
          <Button variant="primary" id="loginButton" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm