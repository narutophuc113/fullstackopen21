import React, { useEffect, useRef } from 'react'
import { Notification, BlogForm, LoginForm, Togglable, Header as HeaderContent } from './components'
import UserPage from './pages/UserPage'
import BlogsPage from './pages/BlogsPage'
import { setUser } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { Layout, Typography } from 'antd'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('userLoggedIn')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <LoginForm/>
      </div>
    )
  }
  return (
    <Layout className={'layout'}>
      <Layout.Header>
        <HeaderContent />
      </Layout.Header>
      <Layout.Content style={{ padding: '0 50px' }}>
        <Notification />
        <Typography.Title>blogs app</Typography.Title>
        <Switch>
          <Route path="/users">
            <UserPage/>
          </Route>
          <Route path='/blogs'>
            <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
              <BlogForm/>
            </Togglable>
            <BlogsPage/>
          </Route>
          <Route path="/">
            <BlogsPage/>
            <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
              <BlogForm/>
            </Togglable>
          </Route>
        </Switch>
      </Layout.Content>
    </Layout>
  )
}

export default App