import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const BlogPage = ({ handleLike }) => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  if(!blogs){
    return null
  }
  const blog = blogs.find(blog => blog.id === id)

  console.log('Blog render')
  return(
    <div id="blog">
        <h2>{blog.title} {blog.author}</h2>
        {blog.url}
        <br></br>
        likes {blog.likes}
        <button id="likeButton" onClick={() => {handleLike({ blog: blog })}}>like</button>
        <br></br>
        added by {blog.user.name}
      </div>
  )
}

export default BlogPage
