import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_AUTHORS, SET_BIRTH } from '../queries'

const Authors = (props) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(SET_BIRTH, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  

  if (!props.authors) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    if(born === "") {
      console.log("please fill all fields, field 'born' is null ")
      return
    }
    const intBorn = parseInt(born)
    
    editAuthor({ variables: { author, intBorn }})
    setAuthor('')
    setBorn('')
  }

  const handleChange = (event) => {
    setAuthor(event.target.value)
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.authorBookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {localStorage.getItem('library-user-token') &&
         <div>
            <h3>Set birthyear</h3>
              <form onSubmit={submit}>
                <div>
                  author
                  <select value={author} onChange={handleChange}>
                    <option></option>
                    {props.authors.map((a) => (
                    <option key={a.id} value={a.name}>{a.name}</option>
                  ))}
                  </select>
                </div>
                <div>
                  born
                  <input
                    type="number"
                    value={born}
                    onChange={({ target }) => setBorn(target.value)}
                  />
                </div>
                <button>update author</button>
              </form>
          </div>
        }
      </div>
    </div>
  )
}

export default Authors
