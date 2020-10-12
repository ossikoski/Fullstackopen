const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
    response.json(blogs)
    })
})
  
blogsRouter.post('/', (request, response) => {
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
})

module.exports = blogsRouter