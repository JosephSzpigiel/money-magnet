import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ handleLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleLogin(email, password);
	};

	return (
		<div>
			<div>Login</div>
			<form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2">
          <div>
              <label htmlFor='email'>Email:</label>
              <input
                type='text'
                id='email'
                value={email}
                onChange={handleEmailChange}
                className="border"
              />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={handlePasswordChange}
              className="border"
            />
          </div>
          <button type='submit'>Login</button>
        </div>
			</form>
			<button>
				<Link to='/signup'>New User? Signup</Link>
			</button>
		</div>
	);
}

export default Login;
