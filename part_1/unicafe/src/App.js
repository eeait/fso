import { useState } from 'react'

const Title = ( {title} ) => (
    <div>
      <h1>{title}</h1>
    </div>
  )

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({name, value}) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <div>
        <p>No feedback given!</p>
      </div>
    )
  }
  return (
    <div>
      <Title title="Stats:"></Title>
      <table>
        <tbody>
          <StatisticLine name="Good" value={good}/>
          <StatisticLine name="Neutral" value={neutral}/>
          <StatisticLine name="Bad" value={bad}/>
          <StatisticLine name="All" value={total}/>
          <StatisticLine
            name="Average"
            value={(good-bad)/total}
          />
          <StatisticLine name="Positive" value={good/total}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Title title="Give feedback:"></Title>
      <Button handleClick={handleGoodClick} text="Good"/>
      <Button handleClick={handleNeutralClick} text="Neutral"/>
      <Button handleClick={handleBadClick} text="Bad"/>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App