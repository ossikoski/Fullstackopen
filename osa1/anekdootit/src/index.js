import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({headerText}) => {
  return(
  <div>
    <h1>
      {headerText}
    </h1>
  </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

  const copy = {...points}
  copy[selected] ++

  let max = points[0]
  let maxIndex = 0
  for (let i = 1; i < 5; i++){
    if (points[i] > max){
      max = points[i]
      maxIndex = i
    }
  }

  return (
    <div>
      <Header headerText = "Anecdote of the day" />
      {anecdotes[selected]}
      <br></br>
      has {points[selected]} votes
      <br></br>
      <Button onClick={() => setPoints(copy)} text='vote'/>
      <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text='next anecdote'/>
      <Header headerText = "Anecdote with most votes" />
      {anecdotes[maxIndex]}
      <br></br>
      has {points[maxIndex]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)