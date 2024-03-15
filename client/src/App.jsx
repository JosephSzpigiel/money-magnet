import './App.css';
import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../components/Login';
import Signup from '../components/Signup';

function App() {
	const [user, setUser] = useState(null);

	return (
		<Router>
			<div>
				<header>
					<NavBar user={user} />
				</header>
			</div>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/about'
					element={<About />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
