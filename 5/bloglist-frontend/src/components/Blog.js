import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogList, renderBlogList }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeButton = () => {
    const tempBlog = ({
      ...blog,
      likes: blog.likes + 1
    })

    updateBlogList(tempBlog)
  }

  const handleDeleteButton = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog.id)
      renderBlogList()
    }

  }

  return (
    <div className='blog' style={blogStyle}>
      <div className='title-author'>
        {blog.title} {blog.author}
        <Togglable className='togglableClass' buttonLabelEnable="view" buttonLabelDisable="hide">
          <div className='url-likes'>
            {blog.url}<br/>
            <div className='numberOfLikes'>
              {blog.likes}
            </div>
          </div>
          <button className='likeButton' onClick={handleLikeButton}>like</button><br/>
          {blog.user['name']}<br/>
          {blog.user.username === JSON.parse(localStorage.getItem('loggedBlogUser')).username &&
            <button onClick={handleDeleteButton}>Delete</button>
          }
        </Togglable>
      </div>

    </div>
  )
}

export default Blog