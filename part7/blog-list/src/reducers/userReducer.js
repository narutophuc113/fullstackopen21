import { setNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import usersService from '../services/users'

export const login = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      dispatch({
        type: 'SET_USER',
        data: user
      })
      dispatch(setNotification({
        type: 'success',
        message: 'Login success'
      }))
    } catch (exception) {
      dispatch(setNotification({
        type: 'error',
        message: `Login failed: ${exception.response.data.error}`
      }))
    }
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const clearUser = () => {
  return {
    type: 'CLEAR_USER'
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER': {
    window.localStorage.setItem('userLoggedIn', JSON.stringify(action.data))
    blogService.setToken(action.data.token)
    return action.data
  }
  case 'CLEAR_USER': {
    window.localStorage.removeItem('userLoggedIn')
    return null
  }
  default:
    return state
  }
}

export default userReducer