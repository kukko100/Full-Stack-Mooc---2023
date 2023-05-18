const Header = (props) => {
  console.log(props + ' props from header')
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = (props) => {
  console.log(props + ' props from part')
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  console.log(props + ' props from content')
  return (
    <div>
      <Part name={props.name} exercises={props.exercises} />
    </div>
  )
}

const Total = (props) => {
  console.log(props + ' props from total');
  let totalScore = 0;
  for (let i = 0; i < props.parts.length; i++) {
    totalScore += props.parts[i].exercises;
  }

  return (
    <div>
      <p>Number of exercises {totalScore}</p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]

  }
  

  return (
    <div>
      <Header name={course.name} />
      {course.parts.map((object, index) => (
        <Content key={index} name={object.name} exercises={object.exercises} />
      ))}
      <Total parts={course.parts} />
    </div>
  )
}

export default App
