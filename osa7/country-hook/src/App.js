import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  console.log('useCountry', name)
  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log('effect', name)
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(response => {
        console.log('promise fulfilled')
        console.log(response)
        setCountry({data: response.data[0], found: true})
      })
      .catch(error => {
        console.log('Country', name, 'not found')
        setCountry('null')
      })
  }, [name])
  return country
}

const Country = ({ country }) => {
  console.log('Country', country)
  if (!country) {
    console.log('first if')
    return null
  }

  if (!country.found) {
    console.log('second if')
    return (
      <div>
        not found...
      </div>
    )
  }
  console.log('found === true')
  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App