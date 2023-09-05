import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCountry, useName } from './hooks'

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country.found === false) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name['common']} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags['svg']} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const country = useCountry()
  const name = useName()

  const fetch = (e) => {
    e.preventDefault()
    country.onChange(name.name)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...name} />
        <button>find</button>
      </form>

      <Country country={country.country} />
    </div>
  )
}

export default App