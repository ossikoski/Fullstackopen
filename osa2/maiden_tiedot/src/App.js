import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryData = ({country}) => {
  console.log('counrty', country, 'languages', country.languages)
  const code = country.alpha3Code.toLowerCase()
  const imgStyle = {
    flex: 1,
    height: 100,
    resizeMode: 'contain' 
  }
  return(
    <div>
      <h1>{country.name}</h1>
      <div>
        capital {country.capital}
        <br></br>
        population {country.population}
      </div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>
            {language.name}
          </li>
        )}
      </ul>
      <img src={`https://restcountries.eu/data/${code}.svg`} style={imgStyle}/>
    </div>
  )
}

const Countries = ({countries}) => {
  if (countries.length == 0){
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (countries[0] == 'no filter'){
    return(
      <div></div>
    )
  }
  else if (countries.length == 1){
    return(
      <CountryData country = {countries[0]}/>
    )
  }
  else{
    return(
      <div>
        {countries.map(country =>
          <div key={country.name}>
            {country.name}
          </div>
        )}
      </div>
    )
  }
}

const App = () => {
  const [filter, setFilter] = useState('/all')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get(`https://restcountries.eu/rest/v2${filter}`)
      .then(response => {
        console.log('promise fulfilled')
        console.log(response)
        if(response.data.length < 10 && response.data.length > 0){
          console.log('datapoint')
          setCountries(response.data)
        }
        else if(response.data.length == 250)
          setCountries(['no filter'])
        else
          setCountries([])
        console.log(countries)
      })
  }, [filter])
  console.log('render', countries.length, 'countries: ', countries)

  const handleFilterChange = (event) => {
    setFilter('/name/' + event.target.value)
    console.log(filter)
  }

  return (
    <div>
      <div>find countries</div>
      <input 
          onChange={handleFilterChange}
        />
      <Countries countries={countries}/>
    </div>
     
  )
}

export default App