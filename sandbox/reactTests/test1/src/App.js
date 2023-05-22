import Note from './components/Note'

const App = (props) => {
  const { notes } = props
  const result = notes.map((note, i) => note.important)
  console.log(result)
  
  return (
    <div>
      <h1>notes</h1> 
      <ul>
        {notes.map((note) => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App
