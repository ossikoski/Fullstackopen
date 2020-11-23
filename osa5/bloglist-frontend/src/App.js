import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification.js'
import LoginForm from './components/LoginForm.js'
import CreateForm from './components/CreateForm.js'
import Togglable from './components/Togglable.js'
import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog, likeBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  console.log('App beginning blogs', blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const CreateFormRef = React.createRef()

  useEffect(() => {
    console.log('effect')
    dispatch(initBlogs())
  }, [])

  //kirjautuneen käyttäjän lataus localstoragesta
  useEffect(() => {
    console.log('Page reload -> effect hook to get localstorage item: ', window.localStorage.getItem('loggedBlogappUser'))
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    else{
      console.log('No logged user found')
    }
  }, [])

  

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      console.log('Local storage after it is set', window.localStorage.getItem('loggedBlogappUser'))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification(''))
    } catch (exception) {
      dispatch(setNotification(''))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 5000)
    }
  }

  const handleLogout = async () => {
    console.log('Logout')
    await window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreate = (blogObject) => {
    console.log('Create new blog, blogobject:', blogObject)
    CreateFormRef.current.toggleVisibility()

    const msg = 'a new blog ' + blogObject.title + ' by ' + blogObject.author + ' added'
    dispatch(setNotification(msg))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log('Returned blog', returnedBlog)
        dispatch(createBlog(returnedBlog))
      })
  }

  const handleLike = ({ blog }) => {
    console.log('Like, blog: ', blog)
    /*
    const blogUser = blog.user
    const blogId = blog.id
    const newObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    blogService
      .update(blogId, newObject)
      .then(returnedBlog => {
        console.log('Returned blog before set: ', returnedBlog)
        console.log('blogs0', blogs[0])
        returnedBlog.user = blogUser
        const mappedBlogs = blogs.map(blog => blog.id !== blogId ? blog : returnedBlog)
        const sortedBlogs = mappedBlogs.sort(compareByLikes)
        //setBlogs(sortedBlogs)
        console.log('Returned blog after set: ', returnedBlog)
        console.log('BlogUser:', blogUser)
      })
    */

    dispatch(likeBlog(blog))
    
    dispatch(setNotification(`${blog.title} liked`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
    
  }

  const handleDeleteBlog = ({ blog }) => {
    const result = window.confirm(`Remove blog ${blog.name} by ${blog.author}`)
    if(result){
      console.log('Delete blog: ', blog)
      const blogId = blog.id
      blogService
        .deleting(blogId)
        .then(() => {
          console.log('deleted')
          //setBlogs(blogs.filter(blog => blog.id !== blogId))
        })
    }
  }

  console.log(window.localStorage.getItem('loggedBlogappUser'))
  return (
    <div>
      {user === null ?
        <div>
          <h2>log in to application</h2>
          <Notification/>
          <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
        </div>
        :
        <div>
          <h2>blogs</h2>
          <Notification/>
          {user.name} logged in
          <br></br>
          <button id="logoutButton" onClick = {() => handleLogout()}>logout</button>
          <Togglable buttonLabel='create new blog' ref={CreateFormRef}>
            <CreateForm create={handleCreate} />
          </Togglable>
        </div>
      }

      <br></br>
      {blogs ?  // Koska blogilista on myös Appissa, ekalla renderöinnillä blogeja ei ole vielä saatu käyttöön.
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDeleteBlog={handleDeleteBlog} user={user}/>
        )
      :
        <div></div>
      }
    </div>
  )
}

export default App