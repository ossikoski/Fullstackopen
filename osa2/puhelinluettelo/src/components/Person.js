import React from 'react'

const Person = ({ person, deletePerson }) => {
  return(
    <div>
      {console.log('id', person.id)}
      {person.name} {person.number}
      <button onClick={deletePerson}>
        delete
      </button>
    </div>
  )
}

export default Person