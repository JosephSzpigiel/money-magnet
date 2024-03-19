import './App.css';
import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Dashboard from '../pages/Dashboard';

function App() {
	const [user, setUser] = useState(null);

	function handleSignup(signupEmail, signupPassword, signupPasswordRepeat) {
		console.log(
			`New Email: ${signupEmail} | Password1: ${signupPassword} | Password2: ${signupPasswordRepeat}`
		);
		if (signupPassword !== signupPasswordRepeat) {
			setErrorMessage('Passwords do not match. Try again.');
			return;
		} else {
			const newUser = {
				email: signupEmail,
				password: signupPassword,
			};
			try {
				fetch(`/api/signup`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newUser),
				})
					.then((res) => {
						if (!res.ok) {
							return res.json().then((data) => {
								throw new Error(data.error);
							});
						}
						return res.json();
					})
					.then((data) => {
						console.log(data);
						setUser(data)
					})
					.catch((error) => {
						console.log(error);
					});
			} catch (error) {
				console.log(error);
			}
		}
	}

	function handleLogin(email, password) {
		const userInfo = {
			email,
			password,
		};
		try {
			fetch(`/api/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userInfo),
			})
				.then((res) => {
					if (!res.ok) {
						return res.json().then((data) => {
							throw new Error(data.error);
						});
					}
					return res.json();
				})
				.then((data) => {
					console.log(data);
					setUser(data);
				});
		} catch (error) {
			console.log(error);
		}
	}

	function handleLogout() {
		try {
			fetch(`/api/logout`, {
				method: 'DELETE',
			})
				.then((res) => res.json())
				.then(setUser(null));
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Router>
			<div>
				<header>
					<NavBar
						user={user}
						handleLogout={handleLogout}
					/>
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
					element={
						user ? (
							<Dashboard user={user} />
						) : (
							<Login handleLogin={handleLogin} />
						)
					}
				/>
				<Route
					path='/signup'
					element={<Signup handleSignup={handleSignup}/>}
				/>
			</Routes>
		</Router>
	);
}

export default App;
