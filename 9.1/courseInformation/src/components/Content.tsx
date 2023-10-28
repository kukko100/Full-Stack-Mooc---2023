import { CoursePart } from "../types"

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element[] =>  {
  const contentElements: JSX.Element[] = props.courseParts.map(part => {
    switch (part.kind) {
      case "basic":
        return (
          <div key={part.name}>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>{part.description}</p>
          </div>
        )
        case "group":
          return (
            <div key={part.name}>
              <h3>{part.name} {part.exerciseCount}</h3> 
              <p>project exercises {part.groupProjectCount}</p>
            </div>
          )
        case "background":
          return (
            <div key={part.name}>
              <h3>{part.name} {part.exerciseCount}</h3> 
              <p>{part.description} </p>
              <p>{part.backgroundMaterial}</p>
            </div>
          )
        case "special":
          return (
            <div key={part.name}>
              <h3>{part.name} {part.exerciseCount}</h3> 
              <p>{part.description}</p>
              <p>required skills: {part.requirements.map(r => r + ", ")}</p>
            </div>
          )
      default: 
        return (
          <div key="default">
            <p>some unknown type</p>
          </div>
        )
    }
  })

  return contentElements;

}

export default Content;