import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add your login logic here
		console.log('Username:', username);
		console.log('Password:', password);
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='username'>Username:</label>
					<input
						type='text'
						id='username'
						value={username}
						onChange={handleUsernameChange}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
			<button>
				<Link to='/signup'>New User? Signup</Link>
			</button>
		</div>
	);
}

export default Login;
