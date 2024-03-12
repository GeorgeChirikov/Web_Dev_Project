import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
// pages
import NavBar from './components/navBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SideBar from './components/sideBar';
import NotFound from './components/notFound';
import Notes from './components/notes';
import NoteFolders from './components/noteFolders';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(
		Boolean(localStorage.getItem('token')) || false
	);
	return (
		<div className="App">
			<BrowserRouter>
				<SideBar />
				<div className="flex-container">
					<NavBar
						isAuthenticated={isAuthenticated}
						setIsAuthenticated={setIsAuthenticated}
					/>
					<Routes>
						<Route
							path="/"
							element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
						/>
						<Route
							path="/login"
							element={
								isAuthenticated ? (
									<Navigate to="/" />
								) : (
									<Login setIsAuthenticated={setIsAuthenticated} />
								)
							}
						/>
						<Route
							path="/signup"
							element={
								isAuthenticated ? (
									<Navigate to="/" />
								) : (
									<Signup setIsAuthenticated={setIsAuthenticated} />
								)
							}
						/>
						<Route path="/notes" element={<Notes />} />
						<Route path="/notefolders" element={<NoteFolders />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
