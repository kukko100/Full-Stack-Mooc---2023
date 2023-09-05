import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'
import { useField, useAnecdotes, useNotification } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/anecdotes">anecdotes</Link>
      <Link style={padding} to="/createNew">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const foundAnecdote = anecdotes.find(anecdote => anecdote.id === Number(id))
  return (
    <div>
      <h3>{foundAnecdote.content}</h3>
      has {foundAnecdote.votes} votes
      <br/>
      <br/>
    </div>
  )
  
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const navigate = useNavigate()

  const content = useField()
  const author = useField()
  const info = useField()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate("/anecdotes")
  }

  const handleReset = () => {
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input name="contentField" {...content} />
        </div>
        <div>
          author
          <input name="authorField" {...author} />
        </div>
        <div>
          url for more info
          <input name="nameField" {...info} />
        </div>
        <button type='submit' onClick={handleSubmit}>create</button>
        <button type='reset' onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const anecdotes = useAnecdotes()
  const notification = useNotification()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    anecdotes.onChange(anecdote)
    notification.onChange('creation', anecdote.content)
    console.log(notification.notification)
    setTimeout(() => {
      notification.onChange('reset')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    // setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        {notification.notification}
          <Routes>
            <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes.anecdotes} />} />
            <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes.anecdotes} />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/createNew" element={<CreateNew addNew={addNew} />} />
          </Routes>
        <Footer />
      </div>
    </Router>      
  )
}

export default App
