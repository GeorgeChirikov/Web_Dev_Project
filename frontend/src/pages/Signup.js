import useField from '../hooks/useField';
import useSignup from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setIsAuthenticated }) => {
	const navigate = useNavigate();
	const email = useField('email');
	const password = useField('password');

	const { signup, error } = useSignup('/api/users/signup');

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		await signup({ email: email.value, password: password.value });
		if (!error) {
			setIsAuthenticated(Boolean(localStorage.getItem('token')));
			navigate('/');
		}
	};
	return (
		<div className="login">
			<h3>Sign up</h3>
			<form onSubmit={handleFormSubmit}>
				<label>Email address:</label>
				<input {...email} />
				<label>Password:</label>
				<input {...password} />
				<button>Sign up</button>
			</form>
		</div>
	);
};

export default Signup;
