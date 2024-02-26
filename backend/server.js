require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors');
const UsersRouter = require('./routers/UsersRouter')
const NotesRouter = require('./routers/NotesRouter')
const RegLogRouter = require('./routers/RegLogRouter')


connectDB()

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', UsersRouter);
app.use('/api/notes', NotesRouter);
app.use('/api/users', RegLogRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
