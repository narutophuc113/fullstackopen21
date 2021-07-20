import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Blogs from './Blogs'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

describe('<Blogs />', () => {
  let component
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()
  beforeEach(() => {
    const blog = {
      user: [],
      likes: 1,
      author: 'test front-end',
      title: 'test front-end',
      url: 'http://test front-end'
    }
    component = render(
      <Blogs blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
    )
  })

  test('Blogs display only title author', () => {
    const div = component.container.querySelector('.togglableContent')
    console.log(prettyDOM(div))
    expect(div).toHaveStyle('display:none')
  })

  test('after click view button, blog display all properties', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    console.log(prettyDOM(div))
    expect(div).not.toHaveStyle('display:none')
  })

  test('click on like button twice', () => {
    const likeBtn = component.getByText('like')
    console.log(prettyDOM(likeBtn))
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)
    expect(updateBlog.mock.calls.length).toBe(2)
  })
})