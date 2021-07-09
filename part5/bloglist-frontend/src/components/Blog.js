import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible,setVisible]=useState(false)
  const [labelButton, setLabelButton]=useState('view')

  const visibleStyle={ display:visible?'':'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeClick=() => {
    const requestData={
      user:blog.user[0]?blog.user[0].id:'',
      likes:blog.likes+1,
      author:blog.author,
      title: blog.title,
      url: blog.url
    }
    updateBlog(blog.id, requestData)
  }

  const handleRemoveClick=() => {
    const result=window.confirm(`Remove blog ${blog.name} by ${blog.author}`)
    if(result){
      deleteBlog(blog.id)
    }
  }

  const toggleViewClick=() => {
    setLabelButton(visible?'view':'hide')
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className={'blog'}>
      <div>{blog.title} {blog.author} <button onClick={toggleViewClick}>{labelButton}</button></div>
      <div style={visibleStyle} className={'togglableContent'}>
        <div>{blog.url}</div>
        <div>likes <span name={'likesNum'}>{blog.likes}</span> <button onClick={handleLikeClick}>like</button></div>
        <div>{blog.user[0]?blog.user[0].name:null}</div>
        <button onClick={handleRemoveClick}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes={
  blog:PropTypes.object.isRequired,
  updateBlog:PropTypes.func.isRequired,
  deleteBlog:PropTypes.func.isRequired
}

export default Blog