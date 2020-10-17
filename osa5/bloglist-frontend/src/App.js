import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification.js'
import LoginForm from './components/LoginForm.js'
import CreateForm from './components/CreateForm.js'
import Togglable from './components/Togglable.js'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState([false, null])

  const CreateFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //kirjautuneen käyttäjän lataus localstoragesta
  useEffect(() => {
    console.log("Page reload -> effect hook to get localstorage item: ", window.localStorage.getItem('loggedBlogappUser'))
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    else{
      console.log("No logged user found")
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      console.log("Local storage after it is set", window.localStorage.getItem('loggedBlogappUser'))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage([false, null])
    } catch (exception) {
      setNotificationMessage([true, 'wrong username or password'])
      setTimeout(() => {
        setNotificationMessage([false, null])
      }, 5000)
    }
    
  }

  const handleLogout = async (event) => {
    console.log("Logout")
    await window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreate = (blogObject) => {
    console.log("Create new blog, blogobject:", blogObject)

    CreateFormRef.current.toggleVisibility()
    
    const msg = 'a new blog ' + blogObject.title + ' by ' + blogObject.author + ' added'
    setNotificationMessage([false, msg])
    setTimeout(() => {
      setNotificationMessage([false, null])
    }, 5000)

    blogService
    .create(blogObject)
    .then(returnedBlog => {
        console.log("Returned blog", returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
    })
}

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage}/>
        <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      </div>
      
    )
  }
  console.log(window.localStorage.getItem('loggedBlogappUser'))
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage}/>
      {user.name} logged in
      <button onClick = {() => handleLogout()}>logout</button>
      <br></br>
      <br></br>
      <h2>create new</h2>
      <Togglable buttonLabel='new blog' ref={CreateFormRef}>
        <CreateForm create={handleCreate} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App