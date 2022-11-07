import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Blog from '../components/Blog'
import PrivateRoute from './PrivateRoute'
import Error from '../components/Error'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/blog',
        element: <PrivateRoute><Blog /></PrivateRoute>
      },
    ],
  },
]);