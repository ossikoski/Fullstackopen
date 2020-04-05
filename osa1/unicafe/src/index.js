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

const StatisticLine = ({statText, statValue}) => (
  <tr>
    <td>{statText}</td>
    <td>{statValue}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad
  let average = 0
  let positive = 0
  if (all !== 0) {
    average = (good - bad) / all
    positive = good / all * 100
    return(
      <table>
        <tbody>
          <StatisticLine statText = 'good ' statValue = {good} />
          <StatisticLine statText = 'neutral ' statValue = {neutral} />
          <StatisticLine statText = 'bad ' statValue = {bad}/>
          <StatisticLine statText = 'all ' statValue = {all}/>
          <StatisticLine statText = 'average ' statValue = {average}/>
          <StatisticLine statText = 'positive ' statValue = {positive + ' %'}/>
        </tbody>
      </table>
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