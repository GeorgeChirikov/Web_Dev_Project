import { Link } from 'react-router-dom';

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
	const handleClick = (e) => {
		setIsAuthenticated(false);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	};

	return (
		<div className="navBar">
			<section className="navBar-section">
				<Link to="/">
					<h1>Home</h1>
				</Link>
				<h1>NavBar</h1>
				<nav>
					{isAuthenticated && (
						<div>
							<span>{JSON.parse(localStorage.getItem('user')).email}</span>
							<button onClick={handleClick}>Log out</button>
						</div>
					)}
					{!isAuthenticated && (
						<div>
							<Link to="/login">Login </Link>
							<Link to="/signup">Signup</Link>
						</div>
					)}
				</nav>
			</section>
		</div>
	);
};

export default NavBar;
