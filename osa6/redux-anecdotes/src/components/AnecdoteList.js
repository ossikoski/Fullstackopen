import React from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  console.log("anecdotelist props", props)

  return(
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button 
              onClick={() => {
                props.voteAnecdote(anecdote.id)
                dispatch(setNotification(`you voted '${anecdote.content}'`, 10, props.oldTimeoutID))
              }}
            >vote</button>
          </div>
        </div>
      )}
    </div>
    
  )
}

const mapStateToProps = (state) => {
  console.log('state in mapstatetoprops', state)
  const filteredAnecdotes = state.anecdotes.filter(a => a.content.includes(state.filter))
  console.log('filteredAnecdotes', filteredAnecdotes)
  return { 
    anecdotes: filteredAnecdotes,  
    oldTimeoutID: state.notification[1]
  }
}

const mapDispatchToProps = {
  voteAnecdote
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)