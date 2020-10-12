const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

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


afterAll(() => {
  console.log('close mongoose connection')
  mongoose.connection.close()
})
