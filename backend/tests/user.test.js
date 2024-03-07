const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server');
const api = supertest(app);
const User = require('../models/User');

/**
 * Deletes all user documents from the database before running the tests.
 */
beforeAll(async () => {
  await User.deleteMany({});
});

describe('User Routes', () => {
  describe('POST /api/users/signup', () => {
    /**
     * Tests the signup route with valid user credentials.
     */
    it('should signup a new user with valid credentials', async () => {
      const userData = {
        email: 'example@email.com',
        password: 'P@ssw0rd',
      };

      const response = await api.post('/api/users/register').send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    /**
     * Tests the signup route with invalid user credentials.
     */
    it('should return an error with invalid credentials', async () => {
      const userData = {
        email: 'example@email.com',
        password: 'invalidpassword',
      };

      const response = await api.post('/api/users/register').send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/users/login', () => {
    /**
     * Tests the login route with valid user credentials.
     */
    it('should login a user with valid credentials', async () => {
      const userData = {
        email: 'example@email.com',
        password: 'P@ssw0rd',
      };

      const response = await api.post('/api/users/login').send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    /**
     * Tests the login route with invalid user credentials.
     */
    it('should return an error with invalid credentials', async () => {
      const userData = {
        email: 'example@email.com',
        password: 'invalidpassword',
      };

      const response = await api.post('/api/users/login').send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});

/**
 * Closes the MongoDB connection after running all the tests.
 */
afterAll(() => {
  mongoose.connection.close();
});
