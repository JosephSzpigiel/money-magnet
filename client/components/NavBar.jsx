// Navbar.js
import React, { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';

function NavBar({ user, handleLogout }) {
	function handleLogoutClick() {
		handleLogout();
	}

	return (
			<div>
				<nav className="flex bg-blue-500">
          <div className="text-white p-1">
					  <NavLink to='/'>Home</NavLink>
          </div>
          <div className="text-white p-1">
            <NavLink to='/about'>About</NavLink>
          </div>
					<div className="text-white p-1">
            {user ? (
              <button onClick={handleLogoutClick}>Logout</button>
            ) : (
              <NavLink to='/login'>Login</NavLink>
            )}
          </div>
				</nav>
			</div>
	);
}

export default NavBar;
