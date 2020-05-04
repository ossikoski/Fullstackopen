import React from 'react'

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

export default Course