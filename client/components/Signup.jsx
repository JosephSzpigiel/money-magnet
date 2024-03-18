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
		<div className="h-screen flex flex-col items-center justify-center">
			<div className="order-1 text-xl font-bold">Sign Up</div>
			<form className="border-blue-500 border-2 rounded order-2 p-4 bg-blue-300" onSubmit={handleSubmit}>
				<div className="m-2">
					<label htmlFor='email'></label>
					<input
						type='email'
						id='email'
						value={email}
            placeholder="Email"
						onChange={handleEmailChange}
            className="borde p-1"
					/>
				</div>
				<div className="m-2">
					<label htmlFor='password'></label>
					<input
						type='password'
						id='password'
						value={password}
            placeholder="Password"
						onChange={handlePasswordChange}
            className="border p-1"
					/>
				</div>
				<div className="m-2">
					<label htmlFor='password'></label>
					<input
						type='password'
						id='passwordRepeat'
						value={passwordRepeat}
            placeholder="Confirm Password"
						onChange={handlePasswordRepeatChange}
            className="border p-1"
					/>
				</div>
				<button className="border text-white rounded bg-sky-800 p-1 hover:bg-sky-600" type='submit'>Sign Up</button>
			</form>
			<button className="order-3">
				<Link to='/login' className="hover:text-red-500">Return to Login</Link>
			</button>
		</div>
	);
}

export default Signup;
