import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244'},
    { name: 'Ada Lovelace', number: '39-44-5323523'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')
  const personsToShow = persons.map(person => ({name: person.name.toLowerCase(), number: person.number})).filter(person => person.name.includes(filter))


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personsArray = persons.map(person => person.name)
    console.log(personsArray.includes(newName))
    if(personsArray.includes(newName))
      alert(`${newName} is already added to phonebook`)
    else
      setPersons(persons.concat(personObject))
    
     
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value.toLowerCase())
    setFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with:
      <input
        onChange = {handleFilterChange}
      />

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value = {newName}
            onChange = {handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            value = {newNumber}
            onChange = {handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {console.log('personstoshow: ', personsToShow)}
      {personsToShow.map((person) =>
        <div key={person.name}>
        {person.name} {person.number}
        </div> 
      )}
    </div>
  )

}

export default App