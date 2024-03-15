import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';

const routes = [
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
		],
	},
];

export default routes;
