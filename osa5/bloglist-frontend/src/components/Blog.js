import React, { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
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

  console.log("Blog render")
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
        {blog.likes}
        <button onClick={() => {handleLike({blog: blog})}}>like</button>
        <br></br>
        {blog.user.name}
      </div>
    </div>
)}

export default Blog
