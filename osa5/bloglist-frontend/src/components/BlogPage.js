import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogPage = ({ handleLike }) => {
  const [comment, setComment] = useState('')
  
  const dispatch = useDispatch()

  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  if(!blogs){
    return null
  }
  const blog = blogs.find(blog => blog.id === id)

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(id, comment))
    dispatch(setNotification('Comment added', false, null, 5))
    setComment('')
  }

  console.log('Blog page render, comments:', blog.comments)
  return(
    <div id="blog">
        <h2>{blog.title} {blog.author}</h2>
        {blog.url}
        <br></br>
        likes {blog.likes}
        <button id="likeButton" onClick={() => {handleLike({ blog: blog })}}>like</button>
        <br></br>
        added by {blog.user.name}
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input
            id='comment'
            type="text"
            value={comment}
            name="NewComment"
            onChange={({ target }) => setComment(target.value)}>
          </input>
          <button id="comment" type="submit">add comment</button>
        </form>
        <ul>
            {blog.comments.map(comment => 
                <li key={comment.id}>
                    {comment}
                </li>
            )}
        </ul>
        
    </div>
  )
}

export default BlogPage
