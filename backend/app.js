require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const customMiddleware = require('./middlewares/customMiddleware');
const notesRouter = require('./routers/NotesRouter');
const usersRouter = require('./routers/UsersRouter');
const RegLogRouter = require('./routers/RegLogRouter');

// express app
const app = express();

// connect to mongodb & listen for requests
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(customMiddleware.requestLogger);

app.get('/', (req, res) => {
	res.send('API Running!');
});

// routes
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/users', RegLogRouter);

// middleware
app.use(customMiddleware.unknownEndpoint);
app.use(customMiddleware.errorHandler);

module.exports = app;
