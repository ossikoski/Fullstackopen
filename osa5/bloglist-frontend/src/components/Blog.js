import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDeleteBlog, user }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const hideWhenInfoVisible = { display: infoVisible ? 'none' : '' }
  const showWhenInfoVisible = { display: infoVisible ? '' : 'none' }

  const toggleInfoVisibility = () => {
    setInfoVisible(!infoVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log('Blog render')
  return(
    <div style={blogStyle}>
      <div style={hideWhenInfoVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleInfoVisibility}>view</button>
      </div>

      <div style={showWhenInfoVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleInfoVisibility}>hide</button>
        <br></br>
        {blog.url}
        <br></br>
        likes {blog.likes}
        <button onClick={() => {handleLike({ blog: blog })}}>like</button>
        <br></br>
        {blog.user.name}
        {console.log(blog)}
        {blog.user.name === user.name?
          <div>
            <button onClick={() => {handleDeleteBlog({ blog: blog })}}>remove</button>
          </div>
          :
          <div>
          </div>
        }
      </div>
    </div>
  )
}

export default Blog
