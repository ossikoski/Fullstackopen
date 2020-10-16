const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog.js')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  
  if (body.username === undefined){
    return response.status(400).json({error: 'username required'})
  }
  if (body.password === undefined){
    return response.status(400).json({error: 'password required'})
  }
  if (body.password.length < 3){
    return response.status(400).json({error: 'invalid password'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  console.log("POST user", user)

  savedUser = await user
    .save()
    .then(result => {
        response.status(201).json(result)
    })
    .catch(error => next(error))
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', {url: 1, title: 1, author: 1})
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
