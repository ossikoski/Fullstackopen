import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but doesnt render url and likes', () => {
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

  
  const component = render(
    <Blog blog={blog} user={user} />
  )

  const div = component.container.querySelector('.noInfo')

  expect(div).toHaveTextContent(
    'Testiblogin title'
  )
  expect(div).toHaveTextContent(
    'Testiblogin author'
  )
  expect(div).not.toHaveTextContent(
    'Testiblogin.url.com'
  )
  expect(div).not.toHaveTextContent(
    'likes'
  )
})