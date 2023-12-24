const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://ecell:vanshvansh@cluster0.b5kuoku.mongodb.net/subscribers")
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.listen(5001, () => console.log('Server Started'))