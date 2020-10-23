import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog tests', () => {
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


