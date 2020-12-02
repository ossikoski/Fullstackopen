import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const CreateForm = ({ create }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    console.log('Create new blog')

    const blogObject = {
      url: newUrl,
      title: newTitle,
      author: newAuthor
    }

    create(blogObject)

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return(
    <Form onSubmit={handleCreate}>
      <Form.Group>
        <h2>create new</h2>
        <Form.Label>title:</Form.Label>
        <input
          id='title'
          type="text"
          value={newTitle}
          name="NewTitle"
          onChange={({ target }) => setNewTitle(target.value)}
        />
        <br></br>
        <Form.Label>author:</Form.Label>
        <input
          id='author'
          type="text"
          value={newAuthor}
          name="NewAuthor"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
        <br></br>
        <Form.Label>url:</Form.Label>
        <input
          id='url'
          type="text"
          value={newUrl}
          name="newUrl"
          onChange={({ target }) => setNewUrl(target.value)}
        />
        <br></br>
        <Button variant="primary" id="createBlog" type="submit">create</Button>
      </Form.Group>
    </Form>
  )
}

export default CreateForm