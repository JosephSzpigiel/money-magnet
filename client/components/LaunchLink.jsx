import React, { useState } from 'react';
import { PlaidLink } from 'react-plaid-link'; // Import PlaidLink component

const LinkBankAccount = ({authToken, setAuthToken}) => {

	const createLinkToken = async () => {
		try {
			const response = await fetch('/api/create_link_token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json()
			.then((linkToken) =>{
				fetch('/api/set_access_token', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body:{
						
					}
				})
			})
		} catch (error) {
			console.error('Error creating link token:', error);
		}
	};

	const handlePlaidLinkSuccess = async (publicToken) => {
		console.log('Public Token:', publicToken);
	};

	return (
		<div>
			<button onClick={createLinkToken}>Link Bank Account</button>
			{authToken && (
				<PlaidLink
					token={linkToken}
					onClick={createLinkToken}
					onSuccess={handlePlaidLinkSuccess}
					// Add other Plaid Link props as needed
				>
					Link Bank Account
				</PlaidLink>
			)}
		</div>
	);
};

export default LinkBankAccount;
