const getId = () => (100000 * Math.random()).toFixed(0)

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
      return action.data
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

export const createAnecdote = (data) => {
  return {
    type: 'NEW',
    data
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default anecdoteReducer