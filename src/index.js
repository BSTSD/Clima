import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/:city",
                element: <App />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
); 