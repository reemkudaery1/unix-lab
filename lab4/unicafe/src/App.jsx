import { useState } from 'react'
import Button from './Button'
import './App.css'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? 0 : (good / total) * 100

  return (
    <div className="feedback-card">
      <h1>Give feedback</h1>
      <div className="buttons-group">
        <Button onClick={() => setGood(good + 1)} text="good" className="btn btn-good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" className="btn btn-neutral" />
        <Button onClick={() => setBad(bad + 1)} text="bad" className="btn btn-bad" />
      </div>
      <div className="stats-box">
        <h2>Statistics</h2>
        <table className="stats-table">
          <tbody>
            <tr><td>good</td><td>{good}</td></tr>
            <tr><td>neutral</td><td>{neutral}</td></tr>
            <tr><td>bad</td><td>{bad}</td></tr>
            <tr><td>all</td><td>{total}</td></tr>
            <tr><td>average</td><td>{average.toFixed(1)}</td></tr>
            <tr><td>positive</td><td className="stat-positive">{positive.toFixed(1)}%</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App