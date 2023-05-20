import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.name}
  </button>
)

const Buttons = (props) => {
  return (
    <div>
      <Button handleClick={props.incrementGood} name='good'/>
      <Button handleClick={props.incrementNeutral} name='neutral' />
      <Button handleClick={props.incrementBad} name='bad' />
    </div>
  )
}

const StatisticsGood = (props) => {
  const positiveValue = props.good / props.all * 100
  const positiveFormatted = positiveValue.toFixed(1)

  return (
    <tr>
      <td>{props.name}</td>
      <td>{positiveFormatted} %</td>
    </tr>
    )
}

const StatisticsAverageValue = (props) => {
  const goodValue = props.good * 1
  const neutralValue = 0
  const badValue = props.bad * -1
  const sumValues = goodValue + neutralValue + badValue
  const averageValue = sumValues / props.all
  const averageFormatted = averageValue.toFixed(1)

  return (
    <tr>
      <td>{props.name}</td>
      <td>{averageFormatted}</td>
    </tr>
  )
}

const StatisticLine = (props) => (
  <tr>
    <td>{props.name}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine name='good' value={props.good} />
          <StatisticLine name='neutral' value={props.neutral} />
          <StatisticLine name='bad' value={props.bad} />
          <StatisticLine name='all' value={props.all} />
          <StatisticsAverageValue name='average' good={props.good} bad={props.bad} all={props.all}/>
          <StatisticsGood name='positive' good={props.good} all={props.all} />
        </tbody>
      </table>
    </div>
  )
}

const History = (props) => {
  if (props.all === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  }
  return (
    <div>
    <Statistics good={props.good} neutral={props.neutral} bad={props.bad} all={props.all} />
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const incrementGood = () => {
    const newGood = good + 1
    setGood(newGood)
    setAll(all + 1)
  }

  const incrementNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    setAll(all + 1)
  }

  const incrementBad = () => {
    const newBad = bad + 1
    setBad(newBad)
    setAll(all + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Buttons incrementGood={incrementGood}  incrementNeutral={incrementNeutral} incrementBad={incrementBad} />
      <h2>statistics</h2>
      <History good={good} bad={bad} all={all} neutral={neutral}/>
    </div>
    
  )
}

export default App;
