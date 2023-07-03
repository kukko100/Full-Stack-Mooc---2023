import { useState } from 'react'

const BlogForm = ({
  createBlog,
  user
}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      'title': newTitle,
      'author': newAuthor,
      'url': newUrl,
      'user': user,
    }
    createBlog(blog)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
            title
          <input
            type="text"
            value={newTitle}
            name="title"
            onChange={event => setNewTitle(event.target.value)}
          />
        </div>
        <div>
            author
          <input
            type="text"
            value={newAuthor}
            name="author"
            onChange={event => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
            url
          <input
            type="text"
            value={newUrl}
            name="url"
            onChange={event => setNewUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm