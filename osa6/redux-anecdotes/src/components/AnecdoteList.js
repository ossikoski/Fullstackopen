import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdotes from '../services/anecdotes'

const AnecdoteList = (props) => {
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
            <button 
              onClick={() => {
                props.voteAnecdote(anecdote.id)
                dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
              }}
            >vote</button>
          </div>
        </div>
      )}
    </div>
    
  )
}

const mapStateToProps = (state) => {
  const filteredAnecdotes = state.anecdotes.filter(a => a.content.includes(state.filter))
  return filteredAnecdotes
}

const mapDispatchToProps = {
  voteAnecdote
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)