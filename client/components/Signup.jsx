import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup({ handleSignup }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handlePasswordRepeatChange = (e) => {
		setPasswordRepeat(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleSignup(email, password, passwordRepeat);
	};

	return (
		<div>
			<h2>Sign Up</h2>
			<form onSubmit={handleSubmit}>
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
				<div>
					<label htmlFor='password'>Confirm Password:</label>
					<input
						type='password'
						id='passwordRepeat'
						value={passwordRepeat}
						onChange={handlePasswordRepeatChange}
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
