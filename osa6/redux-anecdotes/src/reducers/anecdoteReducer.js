import anecdoteService from '../services/anecdotes'

const compareByVotes = (a, b) => {
  if(a.votes < b.votes){
    return 1
  }
  if(a.votes > b.votes){
    return -1
  }
  return 0
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'NEW':
      return [...state, action.data]
    case 'INIT':
      return action.data.sort(compareByVotes)
    case 'VOTE':
      const anecdoteToVote = state.find(a => a.id === action.data.id)
      console.log(state[0].id, '===', action.data.id)
      console.log('anecdotetovote', anecdoteToVote)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }

      return state.map(a => a.id !== action.data.id ? a : votedAnecdote).sort(compareByVotes)
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async  dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.addVote(id)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export default anecdoteReducer