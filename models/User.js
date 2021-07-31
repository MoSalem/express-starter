const { model, Schema } = require('mongoose')

module.exports = model(
  'User', 
  new Schema({
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now()
    }
  })
)
