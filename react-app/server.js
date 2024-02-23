require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db');
const app = express()
const port=process.env.PORT || 3001;

app.use(express.json())
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})