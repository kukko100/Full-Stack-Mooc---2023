import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  
  const filterState = useSelector(state => state.filter)

  const anecdotes = useSelector(state => state.anecdotes).filter((anecdote) => 
    anecdote.content.toLowerCase().includes(filterState.filterValue)
  )

  const handleVote = async (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(showNotification('vote', anecdote, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
          <br/>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList