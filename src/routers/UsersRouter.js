const express = require('express');

const {
    getUsers,
    newUser,
    getUser,
    deleteUser,
    patchUser
} = require('../controllers/UsersController');

const router = express.Router();

// GET all users
router.get('/', getUsers);

// GET a single user by id
router.get('/:id', getUser);

// POST a new user
router.post('/', newUser);

// PATCH a user by id
router.patch('/:id', patchUser);

// DELETE a user by id
router.delete('/:id', deleteUser);

module.exports = router;