import React, { useContext } from 'react'
import { FaGoogle, FaGithub, FaTwitter } from 'react-icons/fa'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/UserContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Register = () => {

  // Getting data from AuthContext [skipped for this assignment, after result just add "verifyEmail"]
  const {user, googleProvider, twitterProvider, githubProvider, signupWithEmailPassword, logInWithPopup, updateUserProfile} = useContext(AuthContext);

  // useNavigate hook
  const navigate = useNavigate();

  // When user logged in redirect to home
  if (user?.uid) {
    return <Navigate to="/" replace={true} />
  };

  // Handle form submit
  const handleSubmit = e => {
    // Disabling form default behavior
    e.preventDefault();
    // Getting name field value
    const name = e.target.name.value;
    // Getting photo url field value
    const userPhoto = e.target.photo.value;
    // Getting email field value
    const email = e.target.email.value;
    // Getting password field value
    const password = e.target.password.value;
    // Creating user with email and password
    signupWithEmailPassword(email, password)
    .then(userCredential => {
      // Signed in 
      const user = userCredential.user;
      // Set use details
      updateUserProfile({displayName: name, photoURL: userPhoto})
      .then(() => {
        // Profile updated!
      }).catch((error) => {
        // Error toast
        toast.error(`${error.code}`, {
          autoClose: 1500, position: toast.POSITION.TOP_CENTER
        });
      });
      // Successful toast
      toast.success('Account created successfully!', {
        autoClose: 1500, position: toast.POSITION.TOP_CENTER
      });
      // Send verification email [skipped for this assignment, after result just add enable the bellow code]
      // verifyEmail()
      // .then(() => {
      //   // Verification email sent toast
      //   toast.success('Verification email has been sent!', {
      //     autoClose: 1500, position: toast.POSITION.TOP_CENTER
      //   });
      // });
      // Form reset
      e.target.reset();
      // Redirect to home
      navigate('/');
    }).catch((error) => {
      // Error toast
      toast.error(`${error.code}`, {
        autoClose: 1500, position: toast.POSITION.TOP_CENTER
      });
    });
  };

  // Handle social media sign up (Popup)
  const handleSocialSignup = provider => {
    // Creating user with social media (Popup)
    logInWithPopup(provider)
    .then(result => {
      // Signed in 
      const user = result.user;
      // Successful toast
      toast.success('Account created successfully!', {
        autoClose: 1500, position: toast.POSITION.TOP_CENTER
      });
      // Redirect to home page
      navigate('/');
    }).catch((error) => {
      // Error toast
      toast.error(`${error.code}`, {
        autoClose: 1500, position: toast.POSITION.TOP_CENTER
      });
    });
  };
  
  return (
    <section className="flex justify-center items-center py-32 bg-slate-50 dark:bg-[#0B1120]">
      <div className="px-8 py-10 text-black dark:text-white bg-gray-100 dark:bg-black w-full max-w-md rounded-lg shadow">
        <h2 className="mb-3 text-3xl font-bold text-center">Sign up for free</h2>
        <p className="text-sm text-center text-black/70 dark:text-white/70">Already have an account? <Link to="/login" className="hover:underline ml-1">Log in here!</Link></p>
        <form onSubmit={handleSubmit} className="space-y-8 my-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm">Full Name</label>
              <input type="name" name="name" id="name" placeholder="Leroy Jenkins" className="w-full px-3 py-2 text-black/80 dark:text-white/100 bg-gray-50 dark:bg-gray-900 border border-black/10 hover:border-primary dark:border-white/10 dark:hover:border-secondary focus:outline-none rounded-md" />
            </div>
            <div className="space-y-2">
              <label htmlFor="photo-url" className="block text-sm">Photo URL</label>
              <input type="url" name="photo" id="photo-url" placeholder="https://source.unsplash.com/50x50" className="w-full px-3 py-2 text-black/80 dark:text-white/100 bg-gray-50 dark:bg-gray-900 border border-black/10 hover:border-primary dark:border-white/10 dark:hover:border-secondary focus:outline-none rounded-md" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">Email address</label>
              <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 text-black/80 dark:text-white/100 bg-gray-50 dark:bg-gray-900 border border-black/10 hover:border-primary dark:border-white/10 dark:hover:border-secondary focus:outline-none rounded-md" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm">Password</label>
              <input type="password" name="password" id="password" placeholder="******" className="w-full px-3 py-2 text-black/80 dark:text-white/100 bg-gray-50 dark:bg-gray-900 border border-black/10 hover:border-primary dark:border-white/10 dark:hover:border-secondary focus:outline-none rounded-md" minLength="6" required />
            </div>
          </div>
          <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-primary hover:bg-secondary text-white/100 dark:text-white/90 hover-effect">Sign up</button>
        </form>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-black/60 dark:text-white/70" />
          <p className="px-3 text-black/60 dark:text-white/70">OR</p>
          <hr className="w-full text-black/60 dark:text-white/70" />
        </div>
        <div className="mt-6 space-y-4">
          <button onClick={() => handleSocialSignup(googleProvider)} className="flex items-center justify-center w-full p-4 space-x-4 rounded-md border border-black/70 hover:border-primary dark:border-white/70 dark:hover:border-secondary hover-effect">
            <FaGoogle className="text-xl" />
            <p>Sign up with Google</p>
          </button>
          <button onClick={() => handleSocialSignup(githubProvider)} className="flex items-center justify-center w-full p-4 space-x-4 rounded-md border border-black/70 hover:border-primary dark:border-white/70 dark:hover:border-secondary hover-effect">
            <FaGithub className="text-xl" />
            <p>Sign up with GitHub</p>
          </button>
          <button onClick={() => handleSocialSignup(twitterProvider)} className="flex items-center justify-center w-full p-4 space-x-4 rounded-md border border-black/70 hover:border-primary dark:border-white/70 dark:hover:border-secondary hover-effect">
            <FaTwitter className="text-xl" />
            <p>Sign up with Twitter</p>
          </button>
        </div>
      </div>
    </section>
  )
};

export default Register;