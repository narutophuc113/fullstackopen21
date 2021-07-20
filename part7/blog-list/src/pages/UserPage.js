import React, { useEffect, useState } from 'react'
import usersService from '../services/users'
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom'
import{ Typography } from 'antd'

const UserDetail = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

const UserPage = () => {
  const [listUser, setListUser] = useState([])

  useEffect(() => {
    usersService.getUsers()
      .then(response => {
        console.log(response)
        setListUser(response)
      })
  }, [])

  let match = useRouteMatch('/users/:userId')
  const userMatch = match ? listUser.find(user => user.id === match.params.userId) : null

  return (
    <div>
      <Switch>
        <Route path={'/users/:userId'}>
          <UserDetail user={userMatch}/>
        </Route>
        <Route path={'/users'}>
          <Typography.Title level={2}>User</Typography.Title>
          <table>
            <thead>
              <tr>
                <th></th>
                <th><strong>blogs created</strong></th>
              </tr>
            </thead>
            <tbody>
              {listUser.map(user =>
                (
                  <tr key={user.id}>
                    <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                    <td>{user.blogs.length}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Route>
      </Switch>
    </div>
  )
}

export default UserPage