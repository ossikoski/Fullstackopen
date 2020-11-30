const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog.js')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    
  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response, next) => {
  console.log("request token", request.token)
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    url: request.body.url,
    title: request.body.title,
    author: request.body.author,
    user: user.id,
    likes: request.body.likes || 0,
    comments: []
  })

  console.log("POST blog", blog)

  if(!blog.title || !blog.url){
    response.status(400).json({ error: 'blog title or url missing' })
  } else{
    const savedBlog = await blog
    .save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.json(savedBlog.toJSON())
  }
  
})

blogsRouter.delete('/:id', async (request, response, next) => {
  if(!request.token){
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  //const user = await User.findById(decodedToken.id)

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === decodedToken.id){
    Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
  }
  else{
    response.status(401).json({ error: 'wrong user' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  console.log('request', request.body)
  const id = request.params.id

  const blog = await Blog.findById(id)

  const commentedBlog = {
    id: blog.id,
    url: blog.url,
    title: blog.title,
    author: blog.author,
    user: blog.user,
    likes: blog.likes,
    comments: blog.comments.concat(request.body.comment)
  }

  console.log('commented blog', commentedBlog)

  const blogResponse = await Blog.findByIdAndUpdate(id, commentedBlog)
  response.json(blogResponse.toJSON())
})

module.exports = blogsRouter