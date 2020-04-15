import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({course}) => {
  return(
    <div>
      <Header course = {course}/>
      <Content course = {course}/>
      <Total course = {course}/>
    </div>
  )
}

const Header = ({course}) => {
  return(
    <div>
      <h1>
        {course.name}
      </h1>
    </div>
    )
}

const Content = ({course}) => {
  return(
    <div>
      {course.parts.map((part, i) =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Part = ({part}) => {
  return(
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}

const Total = ({course}) => {
  let sum = 0
  course.parts.forEach(element => {
    sum += element.exercises
  });
  return(
    <div>
      <b>
        total of {sum} exercises
      </b>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))