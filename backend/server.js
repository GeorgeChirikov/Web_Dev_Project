require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const app = express()
const port = process.env.PORT || 3001
const customMiddleware = require('./middlewares/customMiddleware')

connectDB()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API Running!')
})

app.use('/api/notes', require('./routers/NotesRouter'))
app.use('/api/users', require('./routers/UsersRouter'))

//middleware
app.use(customMiddleware.unknownEndpoint)
app.use(customMiddleware.errorHandler)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
