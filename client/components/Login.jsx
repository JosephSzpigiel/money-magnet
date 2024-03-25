import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ handleLogin, error }) {
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
		<div className="h-screen flex flex-col items-center justify-center">
			<div className="order-1 text-xl font-bold">Login</div>
			<form className="border-blue-500 border-2 rounded order-2 p-4 bg-blue-300" onSubmit={handleSubmit}>
        <div className="">
          <div className="m-2">
              <label htmlFor='email' className=""></label>
              <input
                type='text'
                id='email'
                value={email}
                placeholder="Email"
                onChange={handleEmailChange}
                className="border p-1"
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
          <button className="border text-white rounded bg-sky-800 p-1 hover:bg-sky-600" type='submit'>Login</button>
        </div>
			</form>
			<button className="order-3">
				<Link to='/signup' className="hover:text-red-500">New User? Signup</Link>
			</button>
      <p className="text-red-600">{error}</p>
		</div>
	);
}

export default Login;
