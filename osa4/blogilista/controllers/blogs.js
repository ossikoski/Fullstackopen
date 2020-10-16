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
    likes: request.body.likes || 0
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

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  console.log(body)

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, {new : true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter