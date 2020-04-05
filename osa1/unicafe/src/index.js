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

const StatisticLine = ({statText}) => (
  <div>
    {statText}
  </div>
)

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad
  let average = 0
  let positive = 0
  if (all !== 0) {
    average = (good - bad) / all
    positive = good / all * 100
    return(
      <div>
        <StatisticLine statText = {'good ' + good} />
        <StatisticLine statText = {'neutral ' + neutral} />
        <StatisticLine statText = {'bad ' + bad}/>
        <StatisticLine statText = {'all ' + all}/>
        <StatisticLine statText = {'average ' + average}/>
        <StatisticLine statText = {'positive ' + positive + ' %'}/>
      </div>
    )
  }
  return(
    "No feedback given"
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header headerText='give feedback' />
      <Button onClick={() => setGood(good + 1)} text='good'/>
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button onClick={() => setBad(bad + 1)} text='bad'/>
      <Header headerText='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)