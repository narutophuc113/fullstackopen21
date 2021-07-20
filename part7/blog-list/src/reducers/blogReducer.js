import blogsService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const initBlogList = () => {
  return async (dispatch) => {
    try {
      const blogsList = await blogsService.getAll()
      console.log(blogsList)
      dispatch({
        type: 'INIT_BLOGS_LIST',
        data: blogsList
      })
    } catch (exception) {
      dispatch(setNotification({
        type: 'error',
        message: `init blogs failed: ${exception.response.data.error}`
      }))
    }
  }
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogsService.create(blog)
      dispatch({
        type: 'ADD_BLOG',
        data: newBlog
      })
      dispatch(setNotification({
        type: 'success',
        message: `create ${newBlog.title} - ${newBlog.author} succeed`
      }))
    } catch (exception) {
      dispatch(setNotification({
        type: 'error',
        message: `create ${blog.title} - ${blog.author} failed: ${exception.response.data.error}`
      }))
    }
  }
}

export const updateBlog = (id, modifyBlog) => {
  return async (dispatch) => {
    try {
      const response = await blogsService.update(id, modifyBlog)
      dispatch({
        type: 'UPDATE_BLOG',
        data: response
      })
      dispatch(setNotification({
        type: 'success',
        message: `a blog ${response.title} - ${response.author} updated`
      }))
    } catch (exception) {
      dispatch(setNotification({
        type: 'error',
        message: `update ${modifyBlog.title} - ${modifyBlog.author} failed: ${exception.response.data.error}`
      }))
    }
  }
}

export const deleteBlog = (blogID) => {
  return async (dispatch) => {
    try {
      await blogsService.deleteBlog(blogID)
      dispatch({
        type: 'DELETE_BLOG',
        data: { id: blogID }
      })
      dispatch(setNotification({
        type: 'success',
        message: 'Blog deleted'
      }))
    } catch (exception) {
      dispatch(setNotification({
        type: 'error',
        message: `delete failed ${exception.response.data.error}`
      }))
    }
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'UPDATE_BLOG':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'INIT_BLOGS_LIST':
    return action.data
  default:
    return state
  }
}

export default blogReducer