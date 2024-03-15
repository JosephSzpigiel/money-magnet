// Navbar.js
import React, { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';

function NavBar({ user, handleLogout }) {
	function handleLogoutClick() {
		handleLogout();
	}

	return (
		<header>
			<div>
				<nav>
					<NavLink to='/'>Home</NavLink>
					<NavLink to='/about'>About</NavLink>
					{user ? (
						<button onClick={handleLogoutClick}>Logout</button>
					) : (
						<NavLink to='/login'>Login</NavLink>
					)}
				</nav>
			</div>
		</header>
	);
}

export default NavBar;
