import React, { useState } from 'react';
import { PlaidLink } from 'react-plaid-link'; // Import PlaidLink component

const LinkBankAccount = ({ user }) => {
	const [linkToken, setLinkToken] = useState('');
	const [transactions, setTransactions] = useState([]);

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

			// Call the backend to create an item associated with the user
			// const createItemResponse = await fetch(`/api/create_item/${user.id}`, {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify({
			// 		userId: user.id,
			// 		itemId: itemId,
			// 		accessToken: accessToken,
			// 	}),
			// });
			// if (!createItemResponse.ok) {
			// 	throw new Error('Failed to create item');
			// }
			// const itemData = await createItemResponse.json();
			// console.log('Item created:', itemData);

			// Fetch transactions
			const transactionsResponse = await fetch('/api/transactions', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!transactionsResponse.ok) {
				throw new Error('Failed to fetch transactions');
			}
			const transactionsData = await transactionsResponse.json();
			const fetchedTransactions = transactionsData.latest_transactions;
			console.log('Transactions:', fetchedTransactions);

			// Update state with fetched transactions
			setTransactions(fetchedTransactions);
		} catch (error) {
			console.error('Error during Plaid link success:', error);
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
