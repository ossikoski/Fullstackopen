import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryData = ({country}) => {
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
      <h2>Spoken languages</h2>
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
  const [countryToShow, setCountryToShow] = useState('')
  
  if (countries.length == 0){
    if(countryToShow != '')
      setCountryToShow('')
    console.log('if', countries)
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (countries.length == 1){
    if(countryToShow != '')
      setCountryToShow('')
    console.log('elseif1')
    return(
      <CountryData country = {countries[0]}/>
    )
  }
  else if (countryToShow != ''){
    console.log('elseif2', countryToShow)
    return(
      <CountryData country = {countryToShow}/>
    )
  }
  else{
    if(countryToShow != '')
      setCountryToShow('')
    console.log('else')
    return(
      <div>
        {countries.map(country =>
          <div key={country.name}>
            {country.name}
            <button onClick={() => setCountryToShow(country)}>
              show
            </button>
            {console.log('before click', countryToShow)}
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
        if(response.data.length <= 10 && response.data.length > 0){
          console.log('datapoint')
          setCountries(response.data)
        }
        else
          setCountries([])
        console.log(countries)
      })
  }, [filter])
  console.log('render', countries.length, 'countries: ', countries)

  const handleFilterChange = (event) => {
    console.log('targetvalue', event.target.value)
    if(event.target.value == "")
      setFilter('/all')
    else
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