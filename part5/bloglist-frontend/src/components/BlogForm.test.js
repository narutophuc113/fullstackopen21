import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  test('create new blog', () => {
    const createBlog = jest.fn()
    const component = render(
      <BlogForm createBlog={createBlog}/>
    )
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, { target: { value: 'test create blog form' } })
    fireEvent.change(author, { target: { value: 'test author' } })
    fireEvent.change(url, { target: { value: 'http://test create blog form' } })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test create blog form')
  })
})