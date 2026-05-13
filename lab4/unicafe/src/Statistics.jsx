import StatisticLine from "./StatisticLine"

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total === 0) {
    return <p>No feedback given</p>
  }
  const average = (good - bad) / total
  const positivePercent = (good / total) * 100
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average.toFixed(2)} />
        <StatisticLine text="positive" value={`${positivePercent.toFixed(1)}%`} />
      </tbody>
    </table>
  )
}

export default Statistics

    </td>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average.toFixed(2)} />
        <StatisticLine text="positive" value={`${positivePercent.toFixed(1)}%`} />
      </tbody>
    </table>
  )
}

export default Statistics
