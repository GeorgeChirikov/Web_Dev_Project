import useField from '../hooks/useField';
import useLogin from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
	const navigate = useNavigate();
	const email = useField('email');
	const password = useField('password');

	const { login, error } = useLogin('/api/users/login');

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		if (email.value === '' || password.value === '') {
			alert('Please enter email and password');
		} else {
			await login({ email: email.value, password: password.value });
		}

		if (!error) {
			console.log('success');
			setIsAuthenticated(true);
			navigate('/');
		}
		if (error) {
			console.log('error');
			// navigate('/login');
		}
	};

	return (
		<>
			<form className="signup" onSubmit={handleFormSubmit}>
				<h3>Login</h3>
				<label>Email address:</label>
				<input {...email} />
				<label>Password:</label>
				<input {...password} />
				<button>Log in</button>
			</form>
		</>
	);
};

export default Login;
