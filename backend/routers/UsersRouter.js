const express = require('express');
const router = express.Router();
const {
	getUsers,
	getUser,
	deleteUser,
	patchUser,
} = require('../controllers/UsersController.js');

// GET all users
router.get('/', getUsers);

// GET a single user by id
router.get('/:id', getUser);

// PATCH a user by id
router.patch('/:id', patchUser);

// DELETE a user by id
router.delete('/:id', deleteUser);

module.exports = router;
