require('dotenv').config()  

const express = require('express')
const app = express()
const { connection, connect } = require('mongoose')
// const usersRouter = require('./routes/users')

connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
connection.on('error', (error) => console.error(error))
connection.once('open', () => console.log('Connected to Database'))