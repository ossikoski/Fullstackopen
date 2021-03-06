import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const CountryData = ({country}) => {
  const preWeather = {
    current: {
    }
  }
  const [weather, setWeather] = useState(preWeather)

  useEffect(() => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setWeather(response.data)
      })
  }, [])

  const code = country.alpha3Code.toLowerCase()
  const imgStyle = {
    flag:{
      flex: 1,
      height: 100,
      resizeMode: 'contain'
    },
    weatherIcon:{
      flex: 1,
      height: 80,
      resizeMode: 'contain'
    }
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
      <img src={`https://restcountries.eu/data/${code}.svg`} style={imgStyle.flag}/>
      <h2>Weather in {country.capital}</h2>
        <b>temperature:</b> {weather.current.temperature} Celsius
      <br></br>
      <img src={weather.current.weather_icons} style={imgStyle.weatherIcon}/>
      <br></br>
      <b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
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

        const countries_all = response.data
        const countries_chosen = []
        let filtteri = filter.slice(6, filter.length).toLowerCase()
        console.log('countries_all', countries_all)
        if(countries_all.length > 0 && countries_all.length < 200){
          for (let country of countries_all){
            if(country.name.toLowerCase().includes(filtteri))
              countries_chosen.push(country)
          }
        }
        console.log('chosen', countries_chosen)
        if(countries_chosen.length <= 10 && countries_chosen.length > 0){
          console.log('datapoint')
          setCountries(countries_chosen)
        }
        else
          setCountries([])
      })
  }, [filter])
  console.log('render', countries.length, 'countries: ', countries)

  const handleFilterChange = (event) => {
    console.log('targetvalue of filter', event.target.value)
    if(event.target.value == "")
      setFilter('/all')
    else
      setFilter('/name/' + event.target.value)
    console.log(filter)
  }

  return (
    <div>
      find countries
      <input 
          onChange={handleFilterChange}
        />
      <Countries countries={countries}/>
    </div>
     
  )
}

export default App