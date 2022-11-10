import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/UserContext'
import { Flowbite, Navbar, Dropdown, Avatar, DarkThemeToggle } from 'flowbite-react'
import { toast } from 'react-toastify'

const Header = () => {

  // Getting data from AuthContext
  const {user, userLogOut} = useContext(AuthContext);

  // Get current location
  const location = useLocation();

  // Sign out
  const logOut = () => {
    // Logged out
    userLogOut()
    .then(() => {
      // Sign-out successful toast
      toast.success('User logged out!', {
        autoClose: 1500, position: toast.POSITION.TOP_CENTER
      });
      // Redirect to login
      navigate('/login');
    }).catch((error) => {
      // An error happened
    });
  };

  return (
    <header>
      <Navbar
        fluid={true}
      >
        <Navbar.Brand href="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Legaltix Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Legaltix
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 gap-10">
          <Flowbite>
            <DarkThemeToggle />
          </Flowbite>
          {user?.uid ? (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={<Avatar alt="User settings" img={user?.photoURL} rounded={true}/>}
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {user?.displayName}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item>
                Settings
              </Dropdown.Item>
              <Dropdown.Item>
                Earnings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => logOut()}>
                Sign out
              </Dropdown.Item>
            </Dropdown>) :
            <Dropdown.Item><Link to="/login" state={{from: location}} replace>Login</Link></Dropdown.Item>}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Link to="/">
            <Navbar.Link
              active={true}
            >
              Home
            </Navbar.Link>
          </Link>
          {user?.uid && (
          <>
            <Link to="/my-reviews">
              <Navbar.Link>
                My Reviews
              </Navbar.Link>
            </Link>
            <Link to="/add-service">
              <Navbar.Link>
                Add Service
              </Navbar.Link>
            </Link>
          </>)}
          <Link to="/blog">
              <Navbar.Link>
                Blog
              </Navbar.Link>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
};

export default Header;