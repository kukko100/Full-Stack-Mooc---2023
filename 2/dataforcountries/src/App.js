
import { useEffect, useState } from 'react';
import './App.css';

import countriesServices from './services/countries'
import weatherServices from './services/weather'

import Country from './components/Country'

function App() {
  const [countrySearchField, setCountrySearchField] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([...countries])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countriesServices
      .getAll()
      .then(response => {
        setCountries(response)
        setFilteredCountries(response)
      })
      .catch((error) => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  const handleCountrySearchField = (event) => {
    const updatedCountrySearchField = event.target.value
    setCountrySearchField(updatedCountrySearchField)
  }
    
  useEffect(() => {
    const tempFilteredCountries = countries.filter((country) => {
      if (country.name.official) {
        return country.name.official.toLowerCase().includes(countrySearchField.toLowerCase())
      }
      return false;
    })
    setFilteredCountries(tempFilteredCountries)
  }, [countrySearchField])

  const handleCountryButtonPressed = (event) => {
    const fetchedButtonCountry = []
    fetchedButtonCountry.push(event)
    setFilteredCountries(fetchedButtonCountry)
  }

  const handleFilterBackButton = (event) => {
    setFilteredCountries(countries)
    setCountrySearchField('')
  }




  return (
    <div>
      <form>
        find countries <input
          value={countrySearchField}
          onChange={handleCountrySearchField}
        />
      </form>
      {filteredCountries.length > 1 && (
        <div>
          <ul>
            {filteredCountries.map((country, id) =>
              <div key={id}>
                <button onClick={() => handleCountryButtonPressed(country)}>{country.name.common}</button>
              </div>
              
            )}
          </ul>
        </div>
      )}
      <div>
        {filteredCountries.length === 1 && (
          <div>
            <button onClick={() => handleFilterBackButton()}>Back</button>
            <Country country={filteredCountries[0]}/>
          </div>
          
        )}
      </div>
    </div>
  )
}

export default App;
