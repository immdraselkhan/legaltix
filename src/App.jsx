import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { ToastContainer } from 'react-toastify'
import ThemeContext from './contexts/ThemeContext'
import UserContext from './contexts/UserContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContext>
      <UserContext>
        <RouterProvider router={router} />
        <ToastContainer />
      </UserContext>
    </ThemeContext>
  </React.StrictMode>
);