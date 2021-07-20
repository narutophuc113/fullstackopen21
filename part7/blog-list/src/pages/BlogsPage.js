import React, { useEffect } from 'react'
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom'
import { Blog } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogList } from '../reducers/blogReducer'
import { List } from 'antd'

const BlogsPage=() => {
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)

  const dispatch=useDispatch()

  useEffect(() => {
    const sortBlog = async () => {
      if (user) {
        dispatch(initBlogList())
        blogs.sort((a, b) => b.likes - a.likes)
      }
    }
    sortBlog()
  }, [user])

  const currentPath=useRouteMatch()

  const match=useRouteMatch('/blogs/:blogID')
  const matchBlog=match?blogs.find(blog => blog.id===match.params.blogID):null

  return(
    <div>
      <Switch>
        <Route path={`${currentPath.path}/:blogID`}>
          <Blog blog={matchBlog}/>
        </Route>
        <Route path={`${currentPath.path}`}>
          <List
            itemLayout={'horizontal'}
            dataSource={blogs}
            renderItem={item => (
              <List.Item>
                <Link to={`/blogs/${item.id}`}>{item.title} {item.author}</Link>
              </List.Item>
            )}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default BlogsPage