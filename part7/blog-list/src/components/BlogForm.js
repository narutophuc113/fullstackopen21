import React, { useState } from 'react'
import { addBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Form, Input, Button } from 'antd'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleCreateBlog = (values) => {
    // event.preventDefault()
    console.log(values)
    const newBlog = {
      title, author, url
    }
    dispatch(addBlog(newBlog))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onFinish={handleCreateBlog}>
        <Form.Item>
          <Input id={'title'} type="text" name={'title'} value={title}
            onChange={({ target }) => setTitle(target.value)}/>
        </Form.Item>
        <Form.Item>
          <Input id={'author'} type="text" name={'author'} value={author}
            onChange={({ target }) => setAuthor(target.value)}/>
        </Form.Item>
        <Form.Item>
          <Input id={'url'} type="text" name={'url'} value={url}
            onChange={({ target }) => setUrl(target.value)}/>
        </Form.Item>
        <Button type={'primary'} htmlType={'submit'}>create</Button>
      </Form>
    </div>
  )
}

export default BlogForm