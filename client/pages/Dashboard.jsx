function Dashboard({ user }) {
	return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="text-xl">Welcome to your dashboard, {user.email}!</div>
    </div>
  )
}

export default Dashboard;
