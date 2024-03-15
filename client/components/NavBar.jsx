// Navbar.js
import React, { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';

function NavBar({ user }) {
	return (
		<header>
			<div>
				<nav>
					<NavLink to='/'>Home</NavLink>
					<NavLink to='/about'>About</NavLink>
					{user ? null : <NavLink to='/login'>Login</NavLink>}
				</nav>
			</div>
		</header>
	);
}

export default NavBar;
