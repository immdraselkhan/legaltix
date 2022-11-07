import React, { useContext, useState } from 'react'
import { FaGoogle, FaGithub, FaTwitter } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/UserContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Login = () => {

  // Getting data from AuthContext
  const {googleProvider, twitterProvider, githubProvider, logInWithEmailPassword, logInWithPopup, passwordResetEmail, setLoading} = useContext(AuthContext);

  // useNavigate hook
  const navigate = useNavigate();

  // useLocation hook
  const location = useLocation();

  // Previous location
  const from = location.state?.from?.pathname || '/';

  // User email state
  const [userEmail, setUserEmail] = useState('');

  // Handle form submit
  const handleSubmit = e => {
    // Disabling form default behavior
    e.preventDefault();
    // Getting email field value
    const email = e.target.email.value;
    // Getting password field value
    const password = e.target.password.value;
    // Sign in a user with email and password
    logInWithEmailPassword(email, password)
    .then(userCredential => {
      // Signed in 
      const user = userCredential.user;
      // Successful toast
      toast.success('Logged in successfully!', {
        autoClose: 1500, position: toast.POSITION.TOP_CENTER
      });
      // Form reset
      e.target.reset();
      // Reditect to the targeted page
      navigate(from, {replace: true});
      // Loader state false
      setLoading(false);
    }).catch((error) => {
      // Set email to the state
      setUserEmail(email);
      // Error toast
      toast.error(`${error.code}`, {
        autoClose: 1500, position: toast.POSITION.TOP_CENTER
      });
    });
  };

  // Handle social media sign in (Popup)
  const handleSocialLogin = provider => {
    // Creating user with social media (Popup)
    logInWithPopup(provider)
    .then(result => {
      // Signed in 
      const user = result.user;
      // Successful toast
      toast.success('Logged in successfully!', {
        autoClose: 1500, position: toast.POSITION.TOP_CENTER
      });
      // Reditect to the targeted page
      navigate(from, {replace: true});
      // Loader state false
      setLoading(false);
    }).catch((error) => {
      console.log(error)
      // Error toast
      toast.error(`${error.code}`, {
        autoClose: 1500, position: toast.POSITION.TOP_CENTER
      });
    });
  };

  // Handle password reset
  const passwordReset = email => {
    // Sending email
    passwordResetEmail(email)
    .then(() => {
      // Successful toast
      toast.success('Password reset email sent!', {
        autoClose: 1500, position: toast.POSITION.TOP_CENTER
      });
    }).catch((error) => {
      // Error toast
      toast.error(`${error.code}`, {
        autoClose: 1500, position: toast.POSITION.TOP_CENTER
      });
    });
  };

  return (
    <section className="px-3 flex justify-center items-center py-32 bg-slate-50 dark:bg-[#0B1120]">
      <div className="px-8 py-10 text-black dark:text-white bg-gray-100 dark:bg-black w-full max-w-md rounded-lg shadow">
        <h2 className="mb-3 text-3xl font-bold text-center">Login to your account</h2>
        <p className="text-sm text-center text-black/70 dark:text-white/70">Dont have account? <Link to="/register" className="hover:underline ml-1">Sign up here!</Link></p>
        <div className="my-6 space-y-4">
          <button onClick={() => handleSocialLogin(googleProvider)} className="flex items-center justify-center w-full p-4 space-x-4 rounded-md border border-black/70 hover:border-primary dark:border-white/70 dark:hover:border-secondary hover-effect">
            <FaGoogle className="text-xl" />
            <p>Login with Google</p>
          </button>
          <button onClick={() => handleSocialLogin(githubProvider)} className="flex items-center justify-center w-full p-4 space-x-4 rounded-md border border-black/70 hover:border-primary dark:border-white/70 dark:hover:border-secondary hover-effect">
            <FaGithub className="text-xl" />
            <p>Login with GitHub</p>
          </button>
          <button onClick={() => handleSocialLogin(twitterProvider)} className="flex items-center justify-center w-full p-4 space-x-4 rounded-md border border-black/70 hover:border-primary dark:border-white/70 dark:hover:border-secondary hover-effect">
            <FaTwitter className="text-xl" />
            <p>Login with Twitter</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-black/60 dark:text-white/70" />
          <p className="px-3 text-black/60 dark:text-white/70">OR</p>
          <hr className="w-full text-black/60 dark:text-white/70" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">Email address</label>
              <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 text-black/80 dark:text-white/100 bg-gray-50 dark:bg-gray-900 border border-black/10 hover:border-primary dark:border-white/10 dark:hover:border-secondary focus:outline-none rounded-md" required />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">Password</label>
                <Link onClick={() => passwordReset(userEmail)} className="text-xs hover:underline text-black/70 dark:text-white/70">Forgot password?</Link>
              </div>
              <input type="password" name="password" id="password" placeholder="******" className="w-full px-3 py-2 text-black/80 dark:text-white/100 bg-gray-50 dark:bg-gray-900 border border-black/10 hover:border-primary dark:border-white/10 dark:hover:border-secondary focus:outline-none rounded-md" minLength="6" required />
            </div>
          </div>
          <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-primary hover:bg-secondary text-white/100 dark:text-white/90 hover-effect">Log in</button>
        </form>
      </div>
    </section>
  )
};

export default Login;