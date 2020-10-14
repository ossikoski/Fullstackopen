const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog.js')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    
  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response, next) => {
  body = request.body

  const users = await User.find({})
  console.log("USERS", users)
  const user = users[0]

  if(body.likes === undefined){
    body.likes = 0
  }

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: body.likes
  })

  console.log("POST blog", blog)

  const savedBlog = await blog.save()
  /*
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
  */

  user.blogs = user.blogs.concat(savedBlog._id)
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