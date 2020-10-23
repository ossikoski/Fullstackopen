import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import CreateForm from './CreateForm'
import { prettyDOM } from '@testing-library/dom'

describe('Blog tests (5.13-5.15)', () => {
  const user = {
    username: 'hellas',
    name: 'Arto Hellas',
    id: '5f871654def46b1c5096592b'
  }
    
  const blog = {
    url: 'Testiblogin.url.com',
    title: 'Testiblogin title',
    author: 'Testiblogin author',
    user: {
      username: 'hellas',
      name: 'Arto Hellas',
      id: '5f871654def46b1c5096592b'
    },
    likes: 1
  }
    
  test('renders title and author but doesnt render url and likes', () => {
    const mockHandleLike = jest.fn()
    
    const component = render(
      <Blog blog={blog} user={user} handleLike={mockHandleLike}/>
    )
    const firstDiv = component.container.querySelector('.noInfo')
        
    expect(component.container).toHaveTextContent('Testiblogin title')
    expect(component.container).toHaveTextContent('Testiblogin author')
    expect(firstDiv).not.toHaveTextContent('Testiblogin.url.com')
    expect(firstDiv).not.toHaveTextContent('likes')
    expect(firstDiv).not.toHaveStyle('display: none')
  })
    
  test('after clicking view, all info is rendered', () => {    
    const mockHandleLike = jest.fn()
    
    const component = render(
      <Blog blog={blog} user={user} handleLike={mockHandleLike}/>
    )
        
    const button = component.getByText('view')
    fireEvent.click(button)
    
    expect(component.container).toHaveTextContent('Testiblogin title')
    expect(component.container).toHaveTextContent('Testiblogin author')
    expect(component.container).toHaveTextContent('Testiblogin.url.com')
    expect(component.container).toHaveTextContent('likes')
    expect(component.container).not.toHaveStyle('display: none')
  })
    
  test('after clicking like twice, like function is called twice', () => {
    const mockHandleLike = jest.fn()
    
    const component = render(
      <Blog blog={blog} user={user} handleLike={mockHandleLike}/>
    )
    
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    
    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})

describe('CreateForm tests (5.16*)', () => {
  test('Creating a blog with right information', () => {
    const mockHandleCreate = jest.fn()

    const component = render(
      <CreateForm create={mockHandleCreate}/>
    )
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {target: { value: '5.16 test title' }})
    fireEvent.change(author, {target: { value: '5.16 test author' }})
    fireEvent.change(url, {target: { value: '5.16 test url' }})
    
    fireEvent.submit(form)

    console.log('mock calls', mockHandleCreate.mock.calls)
    console.log('mock calls 0', mockHandleCreate.mock.calls[0])

    expect(mockHandleCreate.mock.calls[0][0].title).toBe('5.16 test title')
    expect(mockHandleCreate.mock.calls[0][0].author).toBe('5.16 test author')
    expect(mockHandleCreate.mock.calls[0][0].url).toBe('5.16 test url')

  })
})


