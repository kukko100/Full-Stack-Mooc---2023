const PartLi = ({ part }) => {
    return (
      <li>{part.name} {part.exercises}</li>
    )
  }
  
  const Course = ({ course }) => {
    const header = <h2>{course.name}</h2>
  
    const content = <ul>
      {course.parts.map((part) =>
        <PartLi key={part.id} part={part} />
        
      )}
    </ul>
  
    const total = course.parts.reduce((s, p) => {
      return s + p.exercises
    }, 0)
  
    return (
      <div>
        {header}
        {content}
        <h4>total of {total} exercises</h4>
      </div>
    )
    
  }

  export default Course