import weatherServices from '../services/weather'
import { useEffect, useState } from 'react';

const Country = ( {country} ) => {
    const [weather, setWeather] = useState(null)

    const languages = Object.values(country.languages)
    const lat = country.capitalInfo.latlng[0]
    const lng = country.capitalInfo.latlng[1]

    const flagStyle = {
        width: 150
    }

    useEffect(() => {
        weatherServices
          .getWeather({ lat, lng })
          .then(response => {
            setWeather(response)
          })
          .catch((error) => {
            console.error('Error fetching weather:', error)
          })
      }, [])

    return (
        <div>
            <h2>{country.name.official}</h2>
            <p>capital {country.capital[0]} </p>
            <p>area {country.area}</p>
            <h3>languages: </h3>
            <ul>
                {languages.map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.svg} style={flagStyle} ></img>

            {weather && (
                <div>
                    <h3>Weather in {weather.location.name}</h3>
                    <p>Temperature {weather.current.temp_c} Celcius</p>
                    <img src={weather.current.condition.icon}></img>
                    <p>Wind {(weather.current.wind_kph/3.6).toFixed(2)} m/s</p>
                </div>
            )}
            
        </div>
    )
}

export default Country