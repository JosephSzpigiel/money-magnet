import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add your signup logic here
		console.log('Username:', username);
		console.log('Email:', email);
		console.log('Password:', password);
	};

	return (
		<div>
			<h2>Sign Up</h2>
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
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={handleEmailChange}
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
				<button type='submit'>Sign Up</button>
			</form>
			<button>
				<Link to='/login'>Return to Login</Link>
			</button>
		</div>
	);
}

export default Signup;
