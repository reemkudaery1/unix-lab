import { useState } from 'react'
import Button from './Button'
import './App.css'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil',
    'Debugging is twice as hard as writing the code in the first place...'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const handleNext = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const maxVotes = Math.max(...votes)
  const mostVotedIndex = votes.indexOf(maxVotes)

  return (
    <div className="anecdote-card">
      <h1>Anecdote of the day</h1>
      <div className="quote-box">
        <div className="quote-text">{anecdotes[selected]}</div>
        <div className="vote-count">has {votes[selected]} votes</div>
      </div>
      <div className="button-group">
        <Button onClick={handleVote} text="vote" className="btn btn-vote" />
        <Button onClick={handleNext} text="next anecdote" className="btn btn-next" />
      </div>
      <div className="most-voted-box">
        <h2>Anecdote with most votes</h2>
        {maxVotes === 0 ? (
          <div className="most-text">No votes yet</div>
        ) : (
          <>
            <div className="most-text">{anecdotes[mostVotedIndex]}</div>
            <div className="most-votes">has {maxVotes} votes</div>
          </>
        )}
      </div>
    </div>
  )
}

export default App