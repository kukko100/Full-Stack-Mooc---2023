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

  const updateBlogList = () => {
    blogService.getAll().then(blogsFetched =>
      setBlogs(sortBlogList(blogsFetched))
    )
  }

  useEffect(() => {
    updateBlogList()
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
        updateBlogList()
        setTimeout(() => {
          setNewBlog('')
        }, 5000)
      })
      .catch(error => {
        setErrorMessage('Unable to add blog.')
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

  const handleLogOut = (event) => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const loginForm = () => {
    const hideWhenVisible = {display: loginVisible ? 'none' : ''}
    const showWhenVisible = {display: loginVisible ? '' : 'none'}

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target}) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
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

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlogList={updateBlogList} />
      )}
    </div>
  )
}

export default App