const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog.js')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
    response.json(blogs)
    })
})
  
blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  console.log("POST blog", blog)

  if(blog.likes === undefined){
    blog.likes = 0
  }

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
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