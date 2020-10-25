import React, { useState } from 'react'

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
    <form onSubmit={handleCreate}>
      <h2>create new</h2>
      <div>
        title:
        <input
          id='title'
          type="text"
          value={newTitle}
          name="NewTitle"
          onChange={({ target }) => setNewTitle(target.value)}
        />
        <br></br>
        author:
        <input
          id='author'
          type="text"
          value={newAuthor}
          name="NewAuthor"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
        <br></br>
        url:
        <input
          id='url'
          type="text"
          value={newUrl}
          name="newUrl"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button id="createBlog" type="submit">create</button>
    </form>
  )
}

export default CreateForm