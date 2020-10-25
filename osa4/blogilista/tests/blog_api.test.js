const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

jest.setTimeout(30000)

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: ';D',
    url: '.com',
    likes: 6
  },
]
beforeEach(async () => {
  console.log('beforeEach')
  await Blog.deleteMany({})

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    console.log('enter json test')
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there is one blog', async () => {
    console.log('enter amount test')
    const response = await api.get('/api/blogs')
    console.log("respo", response.body)
    expect(response.body.length).toBe(initialBlogs.length)
})

test('identifier is named id', async () => {
  console.log('enter id test')
  const response = await api.get('/api/blogs')
  console.log("respo", response.body)
  console.log("id", response.body[0].id)
  console.log("title", response.body[0].title)
  expect(response.body[0].id).toBeDefined()
})

test('add blog', async () => {
  console.log('enter add blog test')

  const newUser = {
    username: 'addblog',
    name: 'Add Blog',
    password: 'salainen'
  }

  const useResult = await api
    .post('/api/users')
    .send(newUser)
  
  const loginResult = await api
    .post('/api/login')
    .send(newUser)

  token = loginResult.body.token

  const newBlog = {
    title: 'addblogtest',
    author: ';D',
    url: '.com',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'bearer ' + token)

  const response = await api.get('/api/blogs')
  console.log("respo", response.body)
  expect(response.body.length).toBe(initialBlogs.length + 1)
})

test('add blog without token', async () => {
  console.log('enter add blog without token test')
  const newBlog = {
    title: 'step3',
    author: ';D',
    url: '.com',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('empty likes equals zero', async () => {
  console.log('empty likes test')

  const loginresult = await api
    .post('/api/login')
    .send({
      username: 'addblog',
      password: 'salainen'
    })

  token = loginresult.body.token

  const newBlog = {
    title: 'empty likes',
    author: ';D',
    url: '.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'bearer ' + token)

  const response = await api.get('/api/blogs')
  console.log("respo", response.body)
  expect(response.body[1].likes).toBe(0)
})

test('empty title and url result in bad request (400)', async () => {
  console.log('empty title and url test')

  const loginresult = await api
    .post('/api/login')
    .send({
      username: 'addblog',
      password: 'salainen'
    })

  token = loginresult.body.token

  await api
    .post('/api/blogs')
    .send({
      author: ';D',
      likes: 100
    })
    .set('Authorization', 'bearer ' + token)
    .expect(400)
})

test('delete blog', async () => {
  console.log('delete blog test')

  const loginresult = await api
    .post('/api/login')
    .send({
      username: 'addblog',
      password: 'salainen'
    })

  token = loginresult.body.token

  const newBlog = {
    title: 'this blog will be deleted',
    author: ';D',
    url: '.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'bearer ' + token)

  const getResponse = await api.get('/api/blogs')
  expect(getResponse.body.length).toBe(initialBlogs.length+1)
  idToDelete = getResponse.body[1].id

  await api
    .delete('/api/blogs/'+idToDelete)
    .set('Authorization', 'bearer ' + token)

  const getResponse2 = await api.get('/api/blogs')

  expect(getResponse2.body.length).toBe(initialBlogs.length)
})

afterAll(async () => {
  console.log('afterAll delete blogs and users and leave hellas user and one blog in the test database')
  await User.deleteMany({})
  await Blog.deleteMany({})

  const hellasUser = {
    username: 'hellas',
    name: 'Arto Hellas',
    password: 'salainen'
  }

  const userResult = await api
    .post('/api/users')
    .send(hellasUser)

  console.log("user left in the database: ", userResult.body)
  
  const loginResult = await api
    .post('/api/login')
    .send(hellasUser)

  token = loginResult.body.token

  const testDatabaseBlog = {
    title: 'test database blog',
    author: 'blog_api.test.js',
    url: '.com',
    likes: 68
  }

  const blogResult = await api
    .post('/api/blogs')
    .send(testDatabaseBlog)
    .set('Authorization', 'bearer ' + token)

  console.log("blog left in the database: ", blogResult.body)

  console.log('close mongoose connection')
  mongoose.connection.close()
})
