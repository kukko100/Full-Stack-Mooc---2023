import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { notificationReducer } from './Notification'
import { useReducer } from 'react'
import Notification from './Notification'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      if (typeof newAnecdote === 'string') {
        notificationDispatch({ type: "ERROR", payload: newAnecdote })
      } else {
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        notificationDispatch({ type: "CREATE", payload: newAnecdote.content })
      }
      
    }
  })

  const [notification, notificationDispatch] = useReducer(notificationReducer, "")

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, id: 0, votes: 0})
    setTimeout(() => {
      notificationDispatch({ type: "HIDE", payload: "" })
    }, 5000)
}

  return (
    <div>
      <Notification notification={notification} />
      <h3>create new</h3>
      <form type='CREATE' onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm