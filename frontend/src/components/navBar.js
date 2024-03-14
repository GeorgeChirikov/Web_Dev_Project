import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
	const handleClick = (e) => {
		setIsAuthenticated(false);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	};

	return (
		<header>
			<div className="container">
				{isAuthenticated && (
					<Link to="/">
						<h1>Home</h1>
					</Link>
				)}

				<nav>
					{isAuthenticated && (
						<div>
							<span>{JSON.parse(localStorage.getItem('user'))?.email ?? '(email not found)'}</span>
							<button onClick={handleClick}>Log out</button>
						</div>
					)}
					{!isAuthenticated && (
						<div>
							<Link to="/login">Login</Link>
							<Link to="/signup">Signup</Link>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
