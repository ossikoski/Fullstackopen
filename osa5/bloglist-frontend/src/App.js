import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'

import BlogPage from './components/BlogPage'
import Notification from './components/Notification.js'
import LoginForm from './components/LoginForm.js'
import CreateForm from './components/CreateForm.js'
import Togglable from './components/Togglable.js'
import Users from './components/Users.js'
import User from './components/User.js'
import Menu from './components/Menu.js'

import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog, likeBlog } from './reducers/blogReducer'
import { setLoggedInUser } from './reducers/loggedInUserReducer'
import { initUsers } from './reducers/userReducer'

import { Table } from 'react-bootstrap'

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
  }, [dispatch])
  
  const blogs = useSelector(state => state.blogs)
  const loggedInUser = useSelector(state => state.loggedInUser)
  const notification = useSelector(state => state.notification)
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

      dispatch(setNotification(`user ${user.username} logged in`, false, notification[2], 5))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', true, notification[2], 5))
    }
  }

  const handleLogout = async () => {
    console.log('Logout')
    await window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setLoggedInUser(null))
    dispatch(setNotification(`user ${loggedInUser.username} logged out`, false, notification[2], 5))
  }

  const handleCreate = (blogObject) => {
    console.log('Create new blog, blogobject:', blogObject)
    CreateFormRef.current.toggleVisibility()
    
    if(blogObject.title === '' || blogObject.author === '' || blogObject.url === ''){
      dispatch(setNotification(`Empty field, blog not added`, true, notification[2], 5))
    } else{
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, false, notification[2], 5))
      dispatch(createBlog(blogObject))
    }
  }

  const handleLike = ({ blog }) => {
    console.log('Like, blog: ', blog)

    dispatch(likeBlog(blog))
    
    dispatch(setNotification(`${blog.title} liked`, false, notification[2], 5))
    
  }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log('loggedBlogappUser', window.localStorage.getItem('loggedBlogappUser'))
  console.log('user before return', loggedInUser)
  return (
    <div class="container">
      {loggedInUser === null ?
        <div>
          <h2>log in to application</h2>
          <Notification/>
          <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
        </div>
        :
        <div>
          <Menu loggedInUser={loggedInUser} handleLogout={handleLogout}/>
          <h2>blog app</h2>
          <Notification/>

          <Switch>
            <Route path="/users/:id">
              <User/>
            </Route>

            <Route path="/users">
              <Users/>
            </Route>

            <Route path="/blogs/:id">
              <BlogPage handleLike={handleLike} />
            </Route>

            <Route path="/">
              <Togglable buttonLabel='create new blog' ref={CreateFormRef}>
                <CreateForm create={handleCreate} />
              </Togglable>
              <Table striped>
                <tbody>
                {blogs ?  // Koska ekalla renderöinnillä blogeja ei ole vielä saatu käyttöön.
                  blogs.map(blog =>
                    <tr key={blog.id} style={blogStyle}>
                      <td>
                        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                      </td>
                    </tr>
                  )
                  :
                    <div></div>
                  }
                </tbody>
              </Table>
            </Route>
          </Switch>
          
        </div>
      }

      
    </div>
  )
}

export default App