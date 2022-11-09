import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Services from '../components/Services'
import Service from '../components/Service'
import Blog from '../components/Blog'
import PrivateRoute from './PrivateRoute'
import AddService from '../components/AddService'
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
        path: '/services',
        element: <Services />
      },
      {
        path: '/service/:slug',
        element: <Service />
      },
      {
        path: '/blog',
        element: <PrivateRoute><Blog /></PrivateRoute>
      },
      {
        path: '/add-service',
        element: <PrivateRoute><AddService /></PrivateRoute>
      },
    ],
  },
]);