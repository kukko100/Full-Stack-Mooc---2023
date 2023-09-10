const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, obj) => totalLikes + obj.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((currentMax, blog) =>
    blog.likes > currentMax.likes ? blog : currentMax
  )
}

const mostBlogs = (blogs) => {
  return (
    lodash.chain(blogs)
      .groupBy('author')
      .toPairs()
      .maxBy(([, blogs]) => blogs.length)
      .thru(([author, blogs]) => ({
        author,
        numberOfBlogs: blogs.length
      }))
      .value()
  )
}

const mostLikes = (blogs) => {
  const result = lodash.chain(blogs)
    .groupBy('author')
    .mapValues((blogs) => lodash.sumBy(blogs, 'likes'))
    .toPairs()
    .maxBy(([author, likes]) => likes)
    .value()

  return { author: result[0], likes: result[1] }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}