require('dotenv').config()

const http = require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (request, response, next) => {
    Person.find({})
    .then(persons => {
        response.json(persons)
    })
    .catch(error => next(error))
    
})

app.get('/api/persons/:id', (request, response, next) => {  
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
    })

app.get('/info', (request, response, next) => {
    Person.countDocuments({})
        .then(count => {
            const timeNow = new Date()
            const phoneBookSize = count
            const longDateTime = timeNow.toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'long'})
            
            response.send(`<p>Phonebook has info for ${phoneBookSize} people<br/>${longDateTime}</p>`)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
    const body = request.body

    if (body.name === "" || body.phoneNumber === "") {
        return response.status(400).json({
            error: 'name or phone number missing'
        })
    }

    const person = new Person({
        name: body.name,
        phoneNumber: body.number
    })

    person
        .save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        phoneNumber: body.number
    }


    Person.findByIdAndUpdate(request.params.id, person, { new: true })
     .then(updatedPerson => {
        response.json(updatedPerson)
     })
     .catch(error => next(error))

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const checkPersonInputErrors = () => {
    
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}

app.use(errorHandler)