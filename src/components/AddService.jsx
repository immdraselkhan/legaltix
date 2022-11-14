import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/UserContext'
import { toast } from 'react-toastify'
import useTitle from '../hooks/useTitle'

const AddService = () => {

  // Set page title
  useTitle('Add Service');

  // Getting data from AuthContext
  const {user, updateUserProfile} = useContext(AuthContext);

  console.log(user);

  // useNavigate hook
  const navigate = useNavigate();

  // Uploaded service thumbnail state
  const [thumbnail, setThumbnail] = useState('');

  // Uploaded user photo state
  const [userPhoto, setUserPhoto] = useState('');

  // Converting the uploaded image to base64
  const convet2base64 = e => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        if (e.target.name === 'thumbnail') {
          setThumbnail(reader.result.toString());
        } else {
          setUserPhoto(reader.result.toString());
        };
      };
    };
  };

  // Handle add service
  const handleAddService = e => {
    // Disabling form default behavior
    e.preventDefault();
    // Create object using form data to post server
    const service = {
      title: e.target.title.value,
      slug: e.target.title.value.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'') + '-' + Math.floor(Math.random() * 100000),
      thumbnail: thumbnail,
      description: e.target.description.value,
      price: e.target.price.value,
      userName: user?.displayName,
      userId: user?.uid,
      userPhoto: user?.photoURL || userPhoto,
      date: new Date().toLocaleString(),
    };
    // Fetch method: POST
    fetch('https://legaltix-api.vercel.app/add-service', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(service)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // Update user details
        updateUserProfile({photoURL: data.updatedPhoto})
        console.log(data.updatedPhoto);
        // Form reset
        e.target.reset();
        // Successful toast
        toast.success(data.message, {
          autoClose: 1500, position: toast.POSITION.TOP_CENTER
        });
        // Redirect to home
        navigate('/');
      } else {
        // Error toast
        toast.error(data.error, {
          autoClose: 1500, position: toast.POSITION.TOP_CENTER
        });
      };
    })
    .catch(error => {
      // Error toast
      toast.error(error.message, {
        autoClose: 1500, position: toast.POSITION.TOP_CENTER
      });
    });
  };

  return (
    <>
      <nav aria-label="breadcrumb" className="w-full px-3 py-10 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white">
        <ol className="flex h-8 space-x-2 w-fit mx-auto">
          <li className="flex items-center">
            <Link to="/" title="Back to homepage" className="flex items-center hover:underline">Home</Link>
          </li>
          <li className="flex items-center space-x-1">
            <span>/</span>
            <p className="flex items-center px-1 capitalize hover:no-underline cursor-default">Add Service</p>
          </li>
        </ol>
      </nav>

      <section className="dark:bg-gray-900 px-3">
        <form className="max-w-2xl mx-auto flex flex-col gap-5 py-20" onSubmit={handleAddService}>
          <input className="input-filed" type="text" name="title" placeholder="Enter service title" required />

          <label className="input-level" htmlFor="thumbnail">Thumbnail</label>
          <input className="input-filed" onChange={(e) => convet2base64(e)} type="file" name="thumbnail" required />

          {!user?.photoURL && <>
          <label className="input-level" htmlFor="thumbnail">Photo</label>
          <input className="input-filed" onChange={(e) => convet2base64(e)} type="file" name="user-photo" required /></>}

          <input className="input-filed" type="number" name="price" placeholder="Enter service price" required />

          <textarea className="input-filed" name="description" cols="30" rows="10" placeholder="Enter service description" required />

          <input className="btn-lg" type="submit" value="Submit" />
        </form> 
      </section>
    </>
  )
};

export default AddService;