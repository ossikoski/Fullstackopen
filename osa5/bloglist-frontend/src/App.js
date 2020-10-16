import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      //console.log(blogs),
      setBlogs( blogs )
    )  
  }, [])

  //kirjautuneen käyttäjän lataus
  useEffect(() => {
    console.log("Page reload -> effect hook to get localstorage item: ", window.localStorage.getItem('loggedBlogappUser'))
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //blogService.setToken(user.token)
    }
    else{
      console.log("No logged user found")
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    //try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      console.log("Local storage after it is set", window.localStorage.getItem('loggedBlogappUser'))
      setUser(user)
      setUsername('')
      setPassword('')
    /*} catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    */
  }

  const handleLogout = async (event) => {
    console.log("Logout")
    await window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              />
            <br></br>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
      
    )
  }
  console.log(window.localStorage.getItem('loggedBlogappUser'))
  return (
    <div>
      <h2>blogs</h2>
      {user.name} logged in
      <button onClick = {() => handleLogout()}>logout</button>
      <br></br>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App