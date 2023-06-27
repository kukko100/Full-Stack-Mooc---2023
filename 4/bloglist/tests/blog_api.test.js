const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async() => {
    const response = await api.get('/api/blogs')

    const authors = response.body.map(r => r.author)
    expect(authors).toContain('Kukko100')
  })
})

describe('viewing a specific blog', () => {
  test('a specific blog can be viewed with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with a statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

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

test('blog without title will not be added', async () => {
  const newBlog = {
    author: 'KukkoNew',
    url: 'www.google.new',
    likes: 100,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without url will not be added', async () => {
  const newBlog = {
    title: 'BlogNew',
    author: 'KukkoNew',
    likes: 100
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('identifier property of the blog posts is named id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const firstBlog = blogsAtStart[0]

  expect(firstBlog.id).toBeDefined()
})

test('if likes property is missing from the request it defaults to 0', async () => {
  const newBlog = {
    title: 'BlogNew',
    author: 'KukkoNew',
    url: 'www.google.new'
  }

  const logInDetails = {
    username: 'root',
    password: 'sekret',
  }

  const result = await api
    .post('/api/login')
    .send(logInDetails)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const testToken = result.body.token

  const response = await api
    .post('/api/blogs')
    .set('authorization', `Bearer ${testToken}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})



describe('updating of a blog', () => {
  test('a blogs like count can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const firstBlogLikesAtStart = blogsAtStart[0].likes
    const firstBlogId = blogsAtStart[0].id

    await api
      .put(`/api/blogs/${firstBlogId}`)
      .send({ likes: 10 })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const firstBlogLikesAtEnd = blogsAtEnd[0].likes

    expect(firstBlogLikesAtEnd).toBe(10)
    expect(firstBlogLikesAtStart).toBe(5)

  })

  test('a blogs author name can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const firstBlogAuthorAtStart = blogsAtStart[0].author
    const firstBlogId = blogsAtStart[0].id

    await api
      .put(`/api/blogs/${firstBlogId}`)
      .send({ author: 'newauthor' })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const firstBlogAuthorAtEnd = blogsAtEnd[0].author

    expect(firstBlogAuthorAtEnd).toBe('newauthor')
    expect(firstBlogAuthorAtStart).toBe('Kukko200')
  })

  test('a blogs title name can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const firstBlogTitleAtStart = blogsAtStart[0].title
    const firstBlogId = blogsAtStart[0].id

    await api
      .put(`/api/blogs/${firstBlogId}`)
      .send({ title: 'newtitle' })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const firstBlogTitleAtEnd = blogsAtEnd[0].title

    expect(firstBlogTitleAtEnd).toBe('newtitle')
    expect(firstBlogTitleAtStart).toBe('Blog2')
  })

  test('a blogs URL can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const firstBlogUrlAtStart = blogsAtStart[0].url
    const firstBlogId = blogsAtStart[0].id

    await api
      .put(`/api/blogs/${firstBlogId}`)
      .send({ url: 'www.newurl.com' })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const firstBlogUrlAtEnd = blogsAtEnd[0].url

    expect(firstBlogUrlAtEnd).toBe('www.newurl.com')
    expect(firstBlogUrlAtStart).toBe('www.google.com')
  })
})

describe('deletion of a blog', () => {
  test('a blog can be deleted by the author logged in', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const logInDetails = {
      username: 'root',
      password: 'sekret',
    }

    const loginResult = await api
      .post('/api/login')
      .send(logInDetails)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const testToken = loginResult.body.token

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `Bearer ${testToken}`)
      .set('user', logInDetails.username)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('a blog can NOT be deleted when invalid login credentials', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const logInDetails = {
      username: 'root',
      password: 'sekret1',
    }

    const loginResult = await api
      .post('/api/login')
      .send(logInDetails)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const testToken = loginResult.body.token

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `Bearer ${testToken}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).toContain(blogToDelete.title)
  })

  test('user that is not the author of the blog can NOT delete it', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const logInDetails = {
      username: 'root',
      password: 'sekret',
    }

    const loginResult = await api
      .post('/api/login')
      .send(logInDetails)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const testToken = loginResult.body.token

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `Bearer ${testToken}`)
      .set('user', logInDetails.username)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })


})

afterAll(async () => {
  await mongoose.connection.close()
})