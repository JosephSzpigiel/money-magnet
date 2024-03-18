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
		try {
			console.log('Public Token:', publicToken);

			const response = await fetch('/api/set_access_token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					public_token: publicToken,
				}),
			});
			if (!response.ok) {
				throw new Error('Failed to exchange public token for access token');
			}
			const data = await response.json();
			const accessToken = data.access_token; // Extract access token from response
			const itemId = data.item_id; // Extract item ID from response

			console.log('Access Token:', accessToken);
			console.log('Item ID:', itemId);

			// Do something with access token and item ID, such as storing them in state or localStorage
		} catch (error) {
			console.error('Error exchanging public token for access token:', error);
		}
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
