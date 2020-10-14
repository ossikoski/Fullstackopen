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

test('create user with taken username', async () => {
    const newUser = {
        username: 'takenusername',
        name: 'Taken username',
        password: 'salasana'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)

    const result2 = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    console.log("Error message: ", result2.body.error)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(1)
})