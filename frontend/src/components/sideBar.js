import { Link } from 'react-router-dom';

const SideBar = () => {
	return (
		<div className="sideBar-Section">
			<div className="sideBar">
				<h2>SideBar</h2>
				<Link to="/create-note">New Note</Link>
			</div>
		</div>
	);
};

export default SideBar;
