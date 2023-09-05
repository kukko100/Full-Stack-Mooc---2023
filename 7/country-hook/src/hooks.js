import { useState } from 'react'
import axios from 'axios'

export const useCountry = (type) => {
  const [country, setCountry] = useState(null)

  const onChange = async (name) => {
    try {
      const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      const data = response['data']
      setCountry({ found: true, data })
    } catch (error) {
      setCountry({ found: false })
    }
  }

  return {
    type,
    country,
    onChange
  }
}

export const useName = (type) => {
  const [name, setName] = useState('')

  const onChange = (event) => {
    setName(event.target.value)
  }

  return {
    type,
    name,
    onChange
  }
}