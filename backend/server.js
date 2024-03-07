require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const UsersRouter = require('./routers/UsersRouter');
const NotesRouter = require('./routers/NotesRouter');
const RegLogRouter = require('./routers/RegLogRouter');
const customMiddleware = require('./middlewares/customMiddleware');
const User = require('./models/User');

connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', UsersRouter);
app.use('/api/notes', NotesRouter);
app.use('/api/users', RegLogRouter);

app.get('/', (req, res) => {
  res.send('API Running!');
});

// app.use('/api/notes', UsersRouter);
// app.use('/api/users', UsersRouter);

//middleware
app.use(customMiddleware.unknownEndpoint);
app.use(customMiddleware.errorHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
