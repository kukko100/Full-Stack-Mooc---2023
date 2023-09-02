import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import NotificationContext from './NotificationContext'
import { useReducer, useContext } from 'react'
import { notificationReducer } from './components/Notification'


const App = () => {

  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const anecdotes = result.data
  

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(updatedAnecdote)
      const updatedIndex = anecdotes.findIndex((a) => a.id === updatedAnecdote.id)
      const updatedAnecdotes = [...anecdotes];
        updatedAnecdotes[updatedIndex] = {
          ...updatedAnecdotes[updatedIndex],
          votes: updatedAnecdote.votes
        }
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
    }
  })

  const [notification, notificationDispatch] = useReducer(notificationReducer, "")
  
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({ type: "VOTE", payload: anecdote })
    setTimeout(() => {
      notificationDispatch({ type: "HIDE", payload: "" })
    }, 5000)    
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  } else if (result.isFetched) {
    anecdotes.sort((a, b) => b.votes - a.votes)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      
      <Notification notification={notification}/>
      
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button type='VOTE' onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
