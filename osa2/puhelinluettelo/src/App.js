import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Person from './components/Person.js'
import Notification from './components/Notification.js'

import personService from './services/personService.js'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState([false, null])
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))
  console.log('personstoshow', personsToShow)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('initialpersons', initialPersons)
        setPersons(initialPersons)
      })
  }, [])
  console.log('persons after render', persons)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personNamesArray = persons.map(person => person.name)
    console.log('Does include', personNamesArray.includes(newName))
    let replace_result = true

    if(personNamesArray.includes(newName)){
      replace_result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(replace_result){
        let id = 0
        for(let person of persons){
          if(person.name === newName){
            id = person.id
          }
        }
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            console.log('UPDATE', returnedPerson)
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNotificationMessage(
              [false, `${newName} number changed to ${newNumber}`]
            )
            setTimeout(() => {
              setNotificationMessage([false, null])
            }, 5000)
          })
          .catch(error => {
            setNotificationMessage([true, `${newName} has already been deleted from the server`])
            setPersons(persons.filter(person => person.id !== id))
            setTimeout(() => {
              setNotificationMessage([false, null])
            }, 5000)
          })
      }
    }
    else{
      personService
        .create(personObject)
        .then(returnedPerson => {
          console.log('returnedPerson:', returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage([
            false,
            `Added ${newName}`
          ])
          setTimeout(() => {
            setNotificationMessage([false, null])
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data)
          setNotificationMessage([
            true,
            error.response.data.error
          ])
          setTimeout(() => {
            setNotificationMessage([false, null])
          }, 5000)
        })
    }
  }

  const deletePersonOf = id => {
    console.log('ID', id)
    const person = persons.find(p => p.id === id)

    const delete_result = window.confirm(`Delete ${person.name} ?`)

    if(delete_result){
      console.log('DELETING')
      personService
        .deleting(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          console.log('DELETED')
          setNotificationMessage([
            false,
            `Deleted ${person.name}`
          ])
          setTimeout(() => {
            setNotificationMessage([false, null])
          }, 5000)
        })
        .catch(error => {
          setNotificationMessage([true, `${person.name} has already been deleted from the server`])
          setPersons(persons.filter(person => person.id !== id))
          setTimeout(() => {
            setNotificationMessage([false, null])
          }, 5000)
        })
    }
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

      <Notification message={notificationMessage}/>

      <Filter handleFilterChange={handleFilterChange}/>

      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>

      {personsToShow.map((person, i) =>
        <Person key = {i}
          person = {person}
          deletePerson={ () => deletePersonOf(person.id) }
        />
      )}
    </div>
  )

}

export default App