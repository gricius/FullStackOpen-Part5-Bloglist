// App.jsx
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService
    .getAll()
    .then(blogs => {
      setBlogs( blogs )
  })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('loggedUserJSON', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('user', user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        showNotification('Blog added by ' + user.name, 'success')
      })
    } catch (exception) {
      showNotification('Error adding blog', 'error')
    }
  }
  
   const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )


  const handleLogout = async () => {
    try {
      // Clear the user data from local storage
      window.localStorage.removeItem('loggedBlogappUser')
      showNotification('Logged out', 'success')
      setUser(null)
    } catch (exception) {
      showNotification('Error logging out', 'error')
    }
}

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification('Logged in', 'success')
      } catch (exception) {
        showNotification('wrong credentials', 'error')
        
      console.log('wrong credentials', exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {notification && <Notification notification={notification} />}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>

      {notification && <Notification notification={notification} />}

        <p>
          {user.name} logged in 
          <button onClick={handleLogout}>Logout</button> 
        </p>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} url={blog.url} />
      ))}
    </div>
  )
}

export default App