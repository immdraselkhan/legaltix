import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/UserContext'
import { toast } from 'react-toastify'
import useTitle from '../hooks/useTitle'

const AddService = () => {

  // Set page title
  useTitle('Add Service');

  // Getting data from AuthContext
  const {user, updateUserProfile} = useContext(AuthContext);

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
    // const time = Date.now()
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
    fetch('http://localhost:8000/add-service', {
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
    <form onSubmit={handleAddService}>
      <input type="text" name="title" placeholder="Enter service title" required />
      <br />
      <label htmlFor="thumbnail" className="block text-sm font-medium">Thumbnail</label>
      <input onChange={(e) => convet2base64(e)} type="file" name="thumbnail" required />
      <br />
      {!user?.photoURL && <input onChange={(e) => convet2base64(e)} type="file" name="user-photo" required />}
      <br />
      <input type="number" name="price" placeholder="Enter service price" required />
      <br />
      <textarea name="description" cols="30" rows="10" placeholder="Enter service description" required />
      <br />
      <input type="submit" value="Submit" />
    </form> 
  )
};

export default AddService;