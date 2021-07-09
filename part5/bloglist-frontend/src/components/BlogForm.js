import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog=(event) => {
    event.preventDefault()
    const newBlog={
      title, author, url
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>title: <input id={'title'} type="text" name={'title'} value={title}
          onChange={({ target }) => setTitle(target.value)}/></div>
        <div>author: <input id={'author'} type="text" name={'author'} value={author}
          onChange={({ target }) => setAuthor(target.value)}/></div>
        <div>url: <input id={'url'} type="text" name={'url'} value={url}
          onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type={'submit'}>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes={
  createBlog: PropTypes.func.isRequired
}

export default BlogForm