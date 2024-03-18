import React, { useState } from 'react';

function Transactions({ authToken }) {

	function handleTransactionClick({authToken}){
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
        };

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
