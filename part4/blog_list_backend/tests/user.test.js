const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('root', 10)
        const user = new User({username: 'root', name: 'root', passwordHash})

        await user.save()
    })
    test('creation succeeds with valid username and password', async () => {
        const userAtStart = await helper.usersInDB()

        const newUser = {
            username: 'phuc',
            name: 'thien',
            password: '123'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-type', /application\/json/)

        const userAtEnd = await helper.usersInDB()
        expect(userAtEnd).toHaveLength(userAtStart.length + 1)

        const usernames = userAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })
    test('creation fail when username not unique', async () => {
        const userAtStart = await helper.usersInDB()

        const newUser = {
            username: 'root',
            name: 'thien',
            password: '123'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')
        const userAtEnd = await helper.usersInDB()
        expect(userAtEnd).toHaveLength(userAtStart.length)
    })
    test('creation fail when username or password not meet length', async () => {
        const userAtStart = await helper.usersInDB()

        const newUser = {
            username: 'ph',
            name: 'thien',
            password: '123'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-type', /application\/json/)

        if (newUser.password.length < 3) {
            expect(result.body.error).toContain('password length at least 3 character')
        } else {
            expect(result.body.error).toContain('`username` (`' + newUser.username + '`) is shorter than the minimum allowed')
        }

        const userAtEnd = await helper.usersInDB()
        expect(userAtEnd).toHaveLength(userAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})