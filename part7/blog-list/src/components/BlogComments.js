import React, { useState } from 'react'
import blogsService from '../services/blogs'
import { Input, Button, Space } from 'antd'

const BlogComments = ({ blogId, comments }) => {
  const [comment, setComment] = useState('')
  const [listComments,setListComments]=useState(comments)

  const handleAddComment = async () => {
    console.log('comment', comment)
    const response=await blogsService.addComment(blogId, { comment })
    setComment('')
    setListComments(response.comments)
  }

  if (listComments.length === 0) {
    return (
      <div>
        <input type="text" placeholder={'You can write your comment here'} value={comment}
          onChange={({ target }) => setComment(target.value)}/>
        <button onClick={handleAddComment}>add comment</button>
        <div>This blog has 0 comment</div>
      </div>
    )
  }
  return (
    <div>
      <div>
        <Space>
          <Input type="text" placeholder={'You can write your comment here'} value={comment}
            onChange={({ target }) => setComment(target.value)}/>
          <Button onClick={handleAddComment}>add comment</Button>
        </Space>
      </div>
      <ul>
        {listComments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default BlogComments