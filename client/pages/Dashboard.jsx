import LaunchLink from '../components/LaunchLink';

function Dashboard({ user }) {
	return (
		<>
			<div>Welcome to your dashboard, {user.email}!</div>
			<LaunchLink user={user} />
		</>
	);
}

export default Dashboard;
