import React, { useState } from 'react';
import { PlaidLink } from 'react-plaid-link'; // Import PlaidLink component

const LinkBankAccount = () => {
	const [linkToken, setLinkToken] = useState('');

	const createLinkToken = async () => {
		try {
			const response = await fetch('/api/create_link_token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			setLinkToken(data.link_token);
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
			{linkToken && (
				<PlaidLink
					token={linkToken}
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
