import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.includes(state.filter)))
  const dispatch = useDispatch()

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
                dispatch(voteAnecdote(anecdote.id))
                dispatch(setNotification(`you voted '${anecdote.content}'`))
                setTimeout(() => {
                    dispatch(setNotification(''))
                  }, 5000)
                }}
            >vote</button>
          </div>
        </div>
      )}
    </div>
    
  )
}

export default AnecdoteList