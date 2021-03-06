const { TestScheduler } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

jest.setTimeout(30000)

beforeEach(async () => {
    console.log('beforeEach')
    await User.deleteMany({})
})

test('create user', async () => {
    const newUser = {
        username: 'testuser',
        name: 'Test User',
        password: 'salainen'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
    
    console.log("Result body: ", result.body)
})

test('create user with no username', async () => {
    const newUser = {
        name: 'nousername',
        password: 'salasana'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    
    console.log("Error message: ", result.body.error)
})

test('create user with no password', async () => {
    const newUser = {
        username: 'nopassword',
        name: 'No password'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    
    console.log("Error message: ", result.body.error)
})

afterAll(async () => {
    console.log('afterAll: Create hellas user to be left in the test database')
    const hellasUser = {
        username: 'hellas',
        name: 'Arto Hellas',
        password: 'salainen'
    }

    const result = await api
        .post('/api/users')
        .send(hellasUser)
    
    console.log("user left in the database: ", result.body)

    console.log('close mongoose connection')
    mongoose.connection.close()
  })