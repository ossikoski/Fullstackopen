import React from 'react'

const CreateForm = ({handleLogin, handleCreate, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl,}) => {
    return(
      <form onSubmit={handleCreate}>
        <div>
            title:
            <input
                type="text"
                value={newTitle}
                name="NewTitle"
                onChange={({ target }) => setNewTitle(target.value)}
            />
            <br></br>
            author:
            <input
                type="text"
                value={newAuthor}
                name="NewAuthor"
                onChange={({ target }) => setNewAuthor(target.value)}
            />
            <br></br>
            url:
            <input
                type="text"
                value={newUrl}
                name="newUrl"
                onChange={({ target }) => setNewUrl(target.value)}
            />
        </div>
        <button type="submit">create</button>
      </form>
    )
}

export default CreateForm