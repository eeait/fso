import { useState, useEffect } from 'react'
import axios from "axios"

const SearchForm = ({ search, handleSearchChange }) => {
  return (
    <div>
      Find countries: <input
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  )
}

const ButtonRow = ({ country, onClick }) => {
  //console.log(country)
  return (
    <div>
      {country.name.common}<button onClick={onClick}>Show</button>
    </div>
  )
}

const OneCountry = ({ props }) => {
  //console.log(props)
  const country_name = props[0].name.common
  //console.log(country_name)
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    //console.log("effect")
    axios
      //.get(`https://restcountries.com/v3.1/name/sweden/?fields=capital,area,languages,flags`)
      .get(`https://restcountries.com/v3.1/name/${country_name}/?fields=capital,area,languages,flags`)
      .then(response => {
        //console.log(response.data)
        //console.log("promise fulfilled")
        setCountryData(response.data[0])
      })
  }, [])

  console.log(countryData)
  //console.log(Object.values(country.languages))
  if (countryData.length === 0) {
    return (
      <div></div>
    )
  }
  return (
    <div>
      <h2>{country_name}</h2>
      <p>Capital: {countryData?.capital[0]}</p>
      <p>Area: {countryData?.area}</p>
      <b>Languages:</b>
      <ul>
        {Object.values(countryData?.languages).map(language =>
        <li key={language}>{language}</li>
        )}
      </ul>
      <img src={countryData?.flags.png} alt={"flag"}></img>
      <Weather city={countryData?.capital} />
    </div>
  )
}

const Weather = ({ city }) => {
  const [weather, setWeather] = useState()
  const [icon, setIcon] = useState()

  const api_key = process.env.REACT_APP_API_KEY
  
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`)
      .then(response => {
        //console.log(response.data)
        const lat = response.data[0].lat
        const lon = response.data[0].lon
        //setCoordinates({"lat": lat, "lon": lon})
        //console.log(coordinates)
        //console.log(`${coordinates.lat}, ${coordinates.lon}`)

        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
          .then(response => {
            //console.log(response.data)
            setWeather(response.data)
            const parent = response.data.weather[0]
            //console.log(parent)
            setIcon(`http://openweathermap.org/img/wn/${parent.icon}@2x.png`)
          })
      })
  }, [])

  //console.log(icon)

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>Temperature: {weather?.main?.temp} Celcius</p>
      <p>Wind: {weather?.wind?.speed} m/s</p>
      <img src={icon} alt="icon"></img>
    </div>
  )
}

const Content = ({ countriesToBeShown, setSearch }) => {
  const 
  
  handleButtonClick = (name) => {
    const handler = () => setSearch(name)
    return handler
  }

  const len = countriesToBeShown.length
  if (len > 10) {
    return (
      <div>
        <p>{countriesToBeShown.length} results, please specify</p>
      </div>
    )
  }
  if (len === 1) {
    return (
      <div>
        <OneCountry props={countriesToBeShown}/>
      </div>
    )
  }
  if (len === 0) {
    return (
      <div>
        <p>No matches</p>
      </div>
    )
  }
  return (
    <div>
    {countriesToBeShown.map(country =>
      <ButtonRow
        key={country.name.common}
        country={country}
        onClick={handleButtonClick(country.name.common)}
      />
    )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name")
      .then(response => {
        setCountries(response.data)
        //console.log(response.data)
      })
  }, [])

  const checkName = (country) => 
    country.name.common.toLowerCase().includes(search.toString().toLowerCase())
  const countriesToBeShown = countries.filter(checkName)

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h1>Countries</h1>
      <SearchForm
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <Content
        countriesToBeShown={countriesToBeShown}
        setSearch={setSearch}
      />
    </div>
  )
}

export default App;