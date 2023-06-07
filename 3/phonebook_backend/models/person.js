const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

//console.log('connecting to', url)
console.log('connecting to mongoDB')

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB')
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  phoneNumber: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: (v) => {
        const test1 = /\d{2}-\d{7}/.test(v)
        const test2 = /\d{3}-\d{8}/.test(v)
        return test1 || test2
      },
      message: props => `${props.value} is not a valid phone number! Acceptable forms are: xxx-xxxxxxxx or xx-xxxxxxx`
    }
  }
})

const opts = { runValidators: true }

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)