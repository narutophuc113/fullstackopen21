import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const Login = ({ username, password, handleLogin, handleUsernameChange, handlePasswordChange }) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>username <input type="text" value={username} name={'Username'} onChange={handleUsernameChange}/>
        </div>
        <div>password <input type="password" value={password} name={'Password'}
          onChange={handlePasswordChange}/></div>
        <button type={'submit'}>login</button>
      </form>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const notificationRef = useRef()

  useEffect(() => {
    const sortBlog = async () => {
      if (user) {
        const blogs = await blogService.getAll()
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      }
    }
    sortBlog()
  }, [user])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('userLoggedIn')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('userLoggedIn', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

      notificationRef.current.showNotification('success', 'Login success')
    } catch (exception) {
      notificationRef.current.showNotification('error', 'Wrong credentials')
    }
  }
  const handleLogout = async () => {
    window.localStorage.removeItem('userLoggedIn')
    setUser(null)
  }

  const createBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog)

      const arrBlogs = blogs.concat(response)
      setBlogs(arrBlogs)

      blogFormRef.current.toggleVisibility()

      notificationRef.current.showNotification('success', `a new blog ${response.title} ${response.author} added`)
    } catch (exception) {
      const message=exception.response.data.error
      notificationRef.current.showNotification('error', `Update fail ${message}`)
    }
  }

  const updateBlog = async (id, modifyBlog) => {
    try {
      const response = await blogService.update(id, modifyBlog)
      setBlogs(blogs.map(blog => blog.id === response.id ? response : blog))

      notificationRef.current.showNotification('success', `a blog ${response.title} ${response.author} updated`)
    } catch (exception) {
      const message=exception.response.data.error
      notificationRef.current.showNotification('error', `Update fail ${message}`)
    }
  }

  const deleteBlog = async (id) => {
    try {
      const response = await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      console.log(response)
      notificationRef.current.showNotification('success', 'a blog deleted')
    } catch (exception) {
      const message=exception.response.data.error
      notificationRef.current.showNotification('error', `Update fail ${message}`)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
      <BlogForm createBlog={createBlog}/>
    </Togglable>
  )

  const loggedIn = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.username} logged in <button type={'button'} onClick={handleLogout}>logout</button></p>
        {blogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification ref={notificationRef}/>
      {user === null ?
        <Login
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
        :
        loggedIn()
      }

    </div>
  )
}

export default App