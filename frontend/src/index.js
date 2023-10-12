import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './components/Login';
import {Register} from './Register'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/signIn",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
