import LaunchLink from '../components/LaunchLink';
import { useState } from 'react';

function Dashboard({ user }) {

	const [authToken, setAuthToken] = useState('');

	return (
		<>
			<div>Welcome to your dashboard, {user.email}!</div>
			<LaunchLink linkToken={linkToken} setLinkToken={setLinkToken}/>
			{linkToken? <p>{linkToken}</p> : null}
		</>
	);
}

export default Dashboard;
