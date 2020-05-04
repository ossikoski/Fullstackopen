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
      <h2>
        {course.name}
      </h2>
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
  let sum = course.parts.reduce((accumulator, currentValue) => {
    return {exercises: accumulator.exercises + currentValue.exercises}
  })
  return(
    <div>
      <b>
        total of {sum.exercises} exercises
      </b>
    </div>
  )
}

const App = () => {
  const courses = [
    {
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course, i) =>
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))