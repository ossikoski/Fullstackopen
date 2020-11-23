import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDeleteBlog, user }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const hideWhenInfoVisible = { display: infoVisible ? 'none' : '' }
  const showWhenInfoVisible = { display: infoVisible ? '' : 'none' }

  const toggleInfoVisibility = () => {
    setInfoVisible(!infoVisible)
  }

  // Kun ei-kirjautuneena, niin userille tyhjä kenttä name, jotta sen vertailu onnistuu delete-napin yhteydessä
  if(user === null){
    user = {
      name: ''
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log('Blog render')
  console.log('user', user)
  return(
    <div id="blog" style={blogStyle}>
      <div style={hideWhenInfoVisible} className='noInfo'>
        {blog.title} {blog.author}
        <button id="viewInfo" onClick={toggleInfoVisibility}>view</button>
      </div>

      <div style={showWhenInfoVisible} className='info'>
        {blog.title} {blog.author}
        <button id="hideInfo" onClick={toggleInfoVisibility}>hide</button>
        <br></br>
        {blog.url}
        <br></br>
        likes {blog.likes}
        <button id="likeButton" onClick={() => {handleLike({ blog: blog })}}>like</button>
        <br></br>
        {blog.user.name}
        {console.log('blog', blog, 'user', user)}
        {blog.user.name === user.name?
          <div>
            <button id="deleteBlog" onClick={() => {handleDeleteBlog({ blog: blog })}}>remove</button>
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
