import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [newBlog, setNewBlog] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  const sortBlogList = (blogsFetched) => {
    const sortedBlogs = [...blogsFetched].sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  }

  const renderBlogList = async () => {
    const blogsFetched = await blogService.getAll()
    setBlogs(sortBlogList(blogsFetched))
  }

  const updateBlogList = async (tempBlog) => {
    await blogService.update(tempBlog.id, tempBlog)
    renderBlogList()
  }

  useEffect(() => {
    renderBlogList()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const addBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog(blog)
        renderBlogList()
        setTimeout(() => {
          setNewBlog('')
        }, 5000)
      })
      .catch(error => {
        setErrorMessage('Unable to create a blog')
        if (error === 'token expired') {
          handleLogOut()
          setErrorMessage('Log in expired, logging out...')
        }
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      })

  }

  const blogForm = () => {
    return(
      <Togglable buttonLabelEnable="create new blog" buttonLabelDisable="cancel" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
          user={user}
        />
      </Togglable>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )

  }

  const blogsReturn = () => {
    useState()
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlogList={updateBlogList} renderBlogList={renderBlogList} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      {errorMessage && (
        <Message.MessageError errorMessage={errorMessage} />
      )}
      {newBlog && (
        <Message.MessageAddSuccessful blogName={newBlog.title} authorName={newBlog.author} />
      )}
      {!user && loginForm()}
      {user && <div>
        <div>
          <>{user.username} logged in</>
          <button onClick={handleLogOut}>log out</button>
          <h2>Create new</h2>
        </div>
        {blogForm()}
      </div>
      }
      {blogsReturn()}
    </div>
  )
}

export default App