import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Services from '../components/Services'
import ServiceDetails from '../components/ServiceDetails'
import Blog from '../components/Blog'
import PrivateRoute from './PrivateRoute'
import AddService from '../components/AddService'
import MyReviews from '../components/MyReviews'
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
        element: <ServiceDetails />
      },
      {
        path: '/blog',
        element: <Blog />
      },
      {
        path: '/add-service',
        element: <PrivateRoute><AddService /></PrivateRoute>
      },
      {
        path: '/my-reviews',
        element: <PrivateRoute><MyReviews /></PrivateRoute>
      },
    ],
  },
]);