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

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good + neutral + bad
  let average = 0
  let positive = 0
  if (all !== 0) {
    average = (good - bad) / all
    positive = good / all * 100
  }
    
  return (
    
    <div>
      <Header headerText='give feedback' />
      <Button onClick={() => setGood(good + 1)} text='good'/>
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button onClick={() => setBad(bad + 1)} text='bad'/>
      <Header headerText='statistics' />
      {'good ' + good}
      <br></br>
      {'neutral ' + neutral}
      <br></br>
      {'bad ' + bad}
      <br></br>
      {'all ' + all}
      <br></br>
      {'average ' + average}
      <br></br>
      {'positive ' + positive + ' %'}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)