/**
 * This file contains the unit tests for the Note routes in the backend server.
 */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server');
const api = supertest(app);
const User = require('../models/User');
const Note = require('../models/Note');

/**
 *  Example of a note object.
 */
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

/**
 * Deletes all users from the database and creates a new user for testing purposes.
 * Sets the token for authentication.
 */
beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post('/api/users/register')
    .send({ email: 'example@email.com', password: 'P@ssw0rd' });
  token = result.body.token;
});

describe('Note Routes', () => {
  /**
   * Deletes all notes from the database and creates new notes for testing purposes.
   */
  beforeEach(async () => {
    await Note.deleteMany({});
    await api
      .post('/api/notes')
      .set('Authorization', 'Bearer ' + token)
      .send(notes[0])
      .send(notes[1]);
  });

  /**
   * Tests the GET /api/notes route.
   * It should return all notes as JSON.
   */
  it('should return all notes as JSON when GET /api/notes is called', async () => {
    await api
      .get('/api/notes')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  /**
   * Tests the POST /api/notes route.
   * It should create a new note.
   */
  it('should create a new note when POST /api/notes is called', async () => {
    const newNote = {
      title: 'new title',
      content: 'new content',
    };
    await api
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(newNote)
      .expect(201);
  });

  /**
   * Tests the GET /api/notes/:id route.
   * It should return a single note as JSON.
   */
  it('should return a single note as JSON when GET /api/notes/:id is called', async () => {
    const note = await Note.findOne({});
    await api
      .get(`/api/notes/${note._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  /**
   * Tests the PATCH /api/notes/:id route.
   * It should update a single note.
   */
  it('should update a single note when PATCH /api/notes/:id is called', async () => {
    const note = await Note.findOne();
    const updatedNote = {
      title: 'updated title',
      content: 'updated content',
    };
    await api
      .patch(`/api/notes/${note._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedNote)
      .expect(200);
    const updatedNoteCheck = await Note.findById(note._id);
    expect(updatedNoteCheck.toJSON()).toEqual(
      expect.objectContaining(updatedNote)
    );
  });

  /**
   * Tests the DELETE /api/notes/:id route.
   * It should delete a single note.
   */
  it('should delete a single note when DELETE /api/notes/:id is called', async () => {
    const note = await Note.findOne({});
    await api
      .delete(`/api/notes/${note._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const noteCheck = await Note.findById(note._id);
    expect(noteCheck).toBeNull();
  });
});

/**
 * Closes the MongoDB connection after all tests have finished.
 */
afterAll(() => {
  mongoose.connection.close();
});
