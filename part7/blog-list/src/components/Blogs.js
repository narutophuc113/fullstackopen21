import React from 'react'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { BlogComments } from './index'
import { Button } from 'antd'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLikeClick = () => {
    const requestData = {
      user: blog.user[0] ? blog.user[0].id : '',
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    dispatch(updateBlog(blog.id, requestData))
  }

  const handleRemoveClick = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      dispatch(deleteBlog(blog.id))
    }
  }
  if (!blog) {
    return null
  }
  return (
    <div className={'blog'}>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>likes <span name={'likesNum'}>{blog.likes}</span>
        <Button onClick={handleLikeClick}>like</Button>
      </div>
      <div>added by {blog.user ? blog.user[0].name : null}</div>
      <Button onClick={handleRemoveClick}>remove</Button>
      <h2>comments</h2>
      <BlogComments comments={blog.comments} blogId={blog.id}/>
    </div>
  )
}

export default Blog