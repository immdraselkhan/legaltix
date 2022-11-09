import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/UserContext'

const Header = () => {

  // Getting data from AuthContext
  const {user, userLogOut} = useContext(AuthContext);

  // Get current location
  const location = useLocation();

  return (
    <header>
      <Link to="/"><button>Home</button></Link>
      <Link to="/blog"><button>Blog</button></Link>
      {
        user?.uid ?
        <>
          <Link to="/my-reviews"><button>My Reviews</button></Link>
          <Link to="/add-service"><button>Add Service</button></Link>
          <button onClick={() => userLogOut()}>Logout</button>
        </> :
        <>
          <Link to="/login" state={{from: location}} replace ><button>Login</button></Link>
        </>
      }
    </header>
  )
};

export default Header;