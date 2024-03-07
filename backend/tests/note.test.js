const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server');
const api = supertest(app);
const User = require('../models/User');
const Note = require('../models/Note');
const notes = [
  {
    title: 'sample title',
    content: 'sample content',
  },
  {
    title: 'sample title 2',
    content: 'sample content 2',
  },
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post('/api/users/signup')
    .send({ email: 'example@email.com', password: 'password' });
  token = result.body.token;
});

describe('Note Routes', () => {
  beforeAll(async () => {
    await Note.deleteMany({});
    await api
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(notes[0])
      .send(notes[1]);
  });
});
