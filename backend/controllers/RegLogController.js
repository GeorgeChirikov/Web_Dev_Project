const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '7d' });
};

//Register a new user
const registerUser = async (req, res) => {
	const { email, password } = req.body;

	// add the user to db
	try {
		const user = await User.signup(email, password);

		// create a token
		const token = createToken(user._id);

		res.status(201).json({ email, token, message: 'Registration complete!' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Login as an existing user
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);

		// create a token
		const token = createToken(user._id);

		res.status(200).json({ email, token, message: 'Login successful!' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { registerUser, loginUser };
