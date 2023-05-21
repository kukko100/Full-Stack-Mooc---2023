import { useState } from 'react'

const Button = ({ handleClick, name }) => (
  <button onClick={handleClick}>
    {name}
  </button>
)

const Statistics = ({ value }) => (
  <p>
    {value}
  </p>
)

const DisplayAnecdote = ({ anecdote }) => (
  <p>
    {anecdote}
  </p>
)

const MostVotedAnecdote = ({ anecdote }) => (
  <div>
    <h2>Anecdote with most votes</h2>
    <DisplayAnecdote anecdote={anecdote} />
  </div>
)

const History = ({ voteClicks, anecdote}) => {
  if (voteClicks === 0) {
    return (
      <p>
        There are no votes done yet. Click the 'vote' button on an anecdote you like to give it a thumbs up!
      </p>
    )
  }
  return (
    <MostVotedAnecdote anecdote={anecdote} />
  )
}



function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [voteClicks, setVoteClicks] = useState(0)
  const [randomNum, setRandomNum] = useState(0)
  const [mostVoted, setMostVoted] = useState(Array(2).fill(0)) //index 0 is the anecdotes index, index 1 is the number of votes



  const clickGenerateRandomNum = () => {
    const min = Math.ceil(0)
    const max = Math.floor(anecdotes.length - 1)
    const newRandomNum = Math.floor(Math.random() * (max - min + 1)) + min
    setRandomNum(newRandomNum)
  }

  const clickVote = () => {
    const newVotes = [...votes]
    const newVotesValueAtIndex = newVotes[randomNum] + 1
    newVotes[randomNum] = newVotesValueAtIndex
    setVotes(newVotes)

    const newButtonClicks = voteClicks + 1
    setVoteClicks(newButtonClicks)

    if (newVotesValueAtIndex > mostVoted[1]) {
      const newMostVoted = [randomNum, newVotesValueAtIndex]
      setMostVoted(newMostVoted)
    }
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <DisplayAnecdote anecdote={anecdotes[randomNum]} />
      <Statistics value={votes[randomNum]}/>
      <Button name='vote' handleClick={clickVote}/>
      <Button name='next anecdote' handleClick={clickGenerateRandomNum}/>
      <History voteClicks={voteClicks} anecdote={anecdotes[mostVoted[0]]} />
    </div>
  )
}

export default App;
