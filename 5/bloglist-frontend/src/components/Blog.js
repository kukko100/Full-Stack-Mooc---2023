import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogList }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeButton = () => {
    const newBlogObject = {
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes + 1,
      'user': blog.user['id'],

    }
    blogService.update(blog.id, newBlogObject)
    updateBlogList()
  }

  const handleDeleteButton = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog.id)
      updateBlogList()
    }

  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabelEnable="view" buttonLabelDisable="hide">
        {blog.url}<br/>
        {blog.likes}
        <button onClick={handleLikeButton}>like</button><br/>
        {blog.user['name']}<br/>
        <button onClick={handleDeleteButton}>Delete</button>
      </Togglable>
    </div>
  )
}

export default Blog