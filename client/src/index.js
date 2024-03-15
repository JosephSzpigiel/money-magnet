import React from 'react';
import App from './components/App';
import './index.css';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routes = [
	{
		path: '/',
		element: <App />,
		errorElement: <div>Error loading app!</div>,
		// children: [
		//     {index: true, element: <Login/>},
		//     {
		//         path: '/login',
		//         element: <Login />,
		//     }
		// ],
	},
];

const router = createBrowserRouter(routes);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
