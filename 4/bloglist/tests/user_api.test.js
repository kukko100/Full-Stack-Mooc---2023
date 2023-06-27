const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'superuser', passwordHash })

  await user.save()
})

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'kukko100',
      name: 'Kukko Pärssinen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

describe('illegal user creation is handled correctly', () => {
  test('user with a PASSWORD shorter than 3 chars can not be created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'passTooShort',
      name: 'tooShort',
      password: '12',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password too short, must be 3 chars or longer')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('user with a USERNAME shorter than 3 chars can not be created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'uN',
      name: 'user name too short',
      password: '123123',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error)
      .toContain(
        `User validation failed: username: Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3).`
      )

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

describe('only a user logged in can perform these actions', () => {
  test('a blog can be created by a user logged in', async() => {
    const blogsAtStart = await helper.blogsInDb()

    const logInDetails = {
      username: 'root',
      password: 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(logInDetails)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const testToken = result.body.token

    const newBlog = {
      title: 'testWithLogin',
      author: logInDetails.username,
      url: 'loginTestUrl.com',
    }

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${testToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
  })

  test('a blog CAN NOT be created if credentials incorrect', async() => {
    const blogsAtStart = await helper.blogsInDb()

    const logInDetails = {
      username: 'root',
      password: 'sekret111'
    }

    const result = await api
      .post('/api/login')
      .send(logInDetails)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const testToken = result.body.token

    const newBlog = {
      title: 'testWithLogin',
      author: logInDetails.username,
      url: 'loginTestUrl.com',
    }

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${testToken}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('a blog can be deleted only by the author signed in', async() => {
    const blogsAtStart = await helper.blogsInDb()
  })
})



afterAll(async () => {
  await mongoose.connection.close()
})