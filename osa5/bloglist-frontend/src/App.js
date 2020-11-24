import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification.js'
import LoginForm from './components/LoginForm.js'
import CreateForm from './components/CreateForm.js'
import Togglable from './components/Togglable.js'
import Users from './components/Users.js'
import User from './components/User.js'

import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { setLoggedInUser } from './reducers/loggedInUserReducer'
import { initUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const CreateFormRef = React.createRef()

  useEffect(() => {
    console.log('init effect')
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])

  //kirjautuneen käyttäjän lataus localstoragesta
  useEffect(() => {
    console.log('Page reload -> effect hook to get localstorage item: ', window.localStorage.getItem('loggedBlogappUser'))
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON)
      console.log('Logged in user found', loggedInUser)
      dispatch(setLoggedInUser(loggedInUser))
      blogService.setToken(loggedInUser.token)
    }
    else{
      console.log('No user logged in')
    }
  }, [])
  
  const blogs = useSelector(state => state.blogs)
  const loggedInUser = useSelector(state => state.loggedInUser)
  console.log('App beginning blogs', blogs)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      console.log('Local storage after it is set', window.localStorage.getItem('loggedBlogappUser'))
      blogService.setToken(user.token)

      dispatch(setLoggedInUser(user))
      setUsername('')
      setPassword('')

      dispatch(setNotification([`user ${user.username} logged in`, false]))
      setTimeout(() => {
        dispatch(setNotification(['', false]))
      }, 5000)
    } catch (exception) {
      dispatch(setNotification(['wrong username or password', true]))
      setTimeout(() => {
        dispatch(setNotification(['', false]))
      }, 5000)
    }
  }

  const handleLogout = async () => {
    console.log('Logout')
    await window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setLoggedInUser(null))
    dispatch(setNotification([`user ${loggedInUser.username} logged out`, false]))
      setTimeout(() => {
        dispatch(setNotification(['', false]))
      }, 5000)
  }

  const handleCreate = (blogObject) => {
    console.log('Create new blog, blogobject:', blogObject)
    CreateFormRef.current.toggleVisibility()

    const msg = 'a new blog ' + blogObject.title + ' by ' + blogObject.author + ' added'

    dispatch(setNotification([msg, false]))
    setTimeout(() => {
      dispatch(setNotification(['', false]))
    }, 5000)

    dispatch(createBlog(blogObject))
  }

  const handleLike = ({ blog }) => {
    console.log('Like, blog: ', blog)

    dispatch(likeBlog(blog))
    
    dispatch(setNotification([`${blog.title} liked`, false]))
    setTimeout(() => {
      dispatch(setNotification(['', false]))
    }, 5000)
    
  }

  const handleDeleteBlog = ({ blog }) => {
    const result = window.confirm(`Remove blog ${blog.name} by ${blog.author}`)
    if(result){
      console.log('Delete blog: ', blog)
      dispatch(deleteBlog(blog.id))

      dispatch(setNotification([`${blog.title} removed`, false]))
      setTimeout(() => {
        dispatch(setNotification(['', false]))
      }, 5000)
    }
  }

  console.log('loggedBlogappUser', window.localStorage.getItem('loggedBlogappUser'))
  console.log('user before return', loggedInUser)
  return (
    <div>
      {loggedInUser === null ?
        <div>
          <h2>log in to application</h2>
          <Notification/>
          <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
        </div>
        :
        <div>
          <h2>blogs</h2>
          <Notification/>
          {loggedInUser.name} logged in
          <br></br><br></br>
          <button id="logoutButton" onClick = {() => handleLogout()}>logout</button>

          <Switch>
            <Route path="/users/:id">
              <User/>
            </Route>

            <Route path="/users">
              <Users/>
            </Route>

            <Route path="/">
              <Togglable buttonLabel='create new blog' ref={CreateFormRef}>
                <CreateForm create={handleCreate} />
              </Togglable>

              <br></br>
              {blogs ?  // Koska ekalla renderöinnillä blogeja ei ole vielä saatu käyttöön.
                blogs.map(blog =>
                  <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDeleteBlog={handleDeleteBlog} user={loggedInUser}/>
                )
              :
                <div></div>
              }
            </Route>
          </Switch>
          
        </div>
      }

      
    </div>
  )
}

export default App