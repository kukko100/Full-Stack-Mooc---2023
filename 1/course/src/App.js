const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.num}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.name.map((name, index) => (
        <Part key={index} name={name} num={props.num[index]} />
      ))}
    </div>
  )
}

const Total = (props) => {
  let totalScore = 0;
  for (let i = 0; i < props.num.length; i++) {
    totalScore += props.num[i];
  }

  return (
    <div>
      <p>Number of exercises {totalScore}</p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [ 'Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercises = [ 10, 7, 14]
  

  return (
    <div>
      <Header name={course} />
      <Content name={parts} num={exercises} />
      <Total num={exercises} />
    </div>
  )
}

export default App
