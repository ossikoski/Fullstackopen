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
  
blogsRouter.post('/', async (request, response) => {
  console.log("POST", request.body)

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

  const savedBlog = await blog.save()
  /*
  TODO: Testit?
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
  */

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
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