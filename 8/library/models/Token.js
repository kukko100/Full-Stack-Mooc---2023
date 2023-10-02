const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    minLength: 3
  }
})

module.exports = mongoose.model('Token', schema)