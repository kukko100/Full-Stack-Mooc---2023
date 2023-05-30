import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Person from './components/Person'
import Message from './components/Message'

import axios from 'axios'
import personServices from './services/persons'

function App() {
  const [persons, setPersons] = useState ([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [updateTick, setUpdateTick] = useState(0)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [personAdded, setPersonAdded] = useState('')
  const [personDeleted, setPersonDeleted] = useState('')

  //Get all people from server when starting up
  useEffect(() => {
    personServices
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [updateTick])

  const addPerson = (event) => {
    event.preventDefault()
    
    const newPerson = { name: newName, number: newNum}
    const idAddPerson = checkIfExists({ newPerson })
    if (idAddPerson === -1) {
      personServices
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setPersonAdded(newName)
          setNewName('')
          setNewNum('')
          setSuccessMessage('Added ')
          setTimeout(() => {
            setSuccessMessage(null)
            setPersonAdded(null)
          }, 5000)
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personServices
          .update(idAddPerson + 1, newPerson)
          .then(response => {
            const updatedPersons = [ ...persons ]
            updatedPersons[idAddPerson] = response
            console.log(response)
            setPersons(updatedPersons)
            setNewName('')
            setNewNum('')
          })
          .catch(error => {
            setPersonDeleted(newPerson.name)
            setTimeout(() => {
              setPersonDeleted(null)
            }, 5000)
            setUpdateTick(updateTick + 1)
          })
      }
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const checkIfExists = ({ newPerson }) => {
    const index = persons.findIndex((person) => person.name === newPerson.name)
    return index
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  useEffect(() => {
  }, [filterValue])

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  )

  const handleDelete = (id) => {
    const tempPersonDelete = persons.find((person) => person.id === id)

    if (tempPersonDelete) {
      if (window.confirm(`Delete ${tempPersonDelete.name}?`)) {
        personServices
          .deletePerson(id)
          .then(() => {
            setPersons(persons.filter((tempPersonDelete) => persons.id !== id))
          })
          .catch((error) => {
            setPersonDeleted(tempPersonDelete.name)
            setTimeout(() => {
              setPersonDeleted(null)
            }, 5000)

          })
      }
      setUpdateTick(updateTick + 1)
    }
  }


  return (
    <div>
      <div>
        <h1>Phonebook</h1>
        {personDeleted && (
          <Message.MessageAlreadyDeleted personDeleted={personDeleted} />
        )}
        {successMessage && (
          <Message.MessageAddSuccessful message={successMessage} newName={personAdded} />
        )}
        <div>
          <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />
        </div>
      </div>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange} />
      <h2>Numbers</h2>
      <div>
        <ul className='filteredPersons'>
          {filteredPersons.map((person, id) =>
            <Person key={id} person={person} handleDelete={handleDelete}/>
          )}
        </ul>
      </div>
      
    </div>
  )
}

export default App;
