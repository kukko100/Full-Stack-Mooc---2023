import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
  axios.get(baseUrl).then(response => response.data)

export const createAnecdote = newAnecdote => {
  if (newAnecdote.content.length < 5) {
    return Promise.resolve('anecdote length must be 5 or more characters')
  } else {
    return axios.post(baseUrl, newAnecdote).then(response => response.data)
  }
  
}
  
  

export const updateAnecdote = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(response => response.data)