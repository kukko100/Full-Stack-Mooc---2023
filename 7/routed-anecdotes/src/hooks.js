import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset
  }
}

export const useAnecdotes = (type) => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const onChange = (anecdote) => {
    setAnecdotes(anecdotes.concat(anecdote))
  }

  return {
    type,
    anecdotes,
    onChange,
  }
}

export const useNotification = (type) => {
  const [notification, setNotification] = useState('')

  const onChange = (type, content) => {
    if (type === 'creation') {
      setNotification(`a new anecdote ${content} created!`)
    } else if (type === 'reset') {
      setNotification('')
    }
  }

  return {
    type,
    notification,
    onChange
  }
}