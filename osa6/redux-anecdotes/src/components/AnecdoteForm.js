import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  console.log('AnecdoteForm props', props)
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    dispatch(setNotification(`you added '${content}'`, 10, props.oldTimeoutID))
  }
  
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote"/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('ANECDOTEFORM state in mapstatetoprops', state)
  return {
    oldTimeoutID: state.notification[1]
  }
}

export default connect(
  mapStateToProps,
  { createAnecdote }
)(AnecdoteForm)