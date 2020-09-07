import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Person from './components/Person.js'

import personService from './services/personService.js'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')
  
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))
  console.log("personstoshow", personsToShow)

  useEffect(() => {
    console.log('effect')
    personService   
      .getAll()
        .then(initialPersons => {
          console.log("initialpersons", initialPersons)
          setPersons(initialPersons)
        })
  }, [])
  console.log("persons after render", persons)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personNamesArray = persons.map(person => person.name)
    console.log(personNamesArray.includes(newName))

    if(personNamesArray.includes(newName))
      alert(`${newName} is already added to phonebook`)
    else{
      personService
        .create(personObject)
          .then(returnedPerson => {
            console.log("returnedPerson:", returnedPerson)
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
        })
    }
  }

  const deletePersonOf = id => {
    console.log("ID", id)
    const person = persons.find(p => p.id === id) 

    const result = window.confirm(`Delete ${person.name} ?`)

    if(result){
      console.log("DELETING")
      personService
      .deleting(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
    console.log("DELETED")
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
      <Filter handleFilterChange={handleFilterChange}/>

      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>

      {personsToShow.map((person, i) =>
        <Person key = {i}
        person = {person}
        deletePerson={()=>deletePersonOf(person.id)}
        />
      )}
    </div>
  )

}

export default App