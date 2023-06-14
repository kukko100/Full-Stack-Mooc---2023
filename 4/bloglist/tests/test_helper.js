const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Blog2',
    author: 'Kukko200',
    url: 'www.google.com',
    likes: 5,
    id: '648746cb73cda734661a8e3b'
  },
  {
    title: 'Blog1',
    author: 'Kukko100',
    url: 'www.google.com',
    likes: 1,
    id: '6487470f73cda734661a8e41'
  },
]

const nonExistingId = async () => {
  const blog = new Blog(
    {
      title: 'willremovethissoon',
      author: 'kukkodeleted',
      url: 'www.deleted.com',
      likes: 1
    }
  )
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async() => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}