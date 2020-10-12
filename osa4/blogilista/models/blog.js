const mongoose = require('mongoose')
const logger = require('../utils/logger')

const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: String,
  url: {type: String, required: true},
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Blog', blogSchema)