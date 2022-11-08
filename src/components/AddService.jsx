import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/UserContext'
import { toast } from 'react-toastify'

const AddService = () => {

  // Getting data from AuthContext [skipped for this assignment, after result just add "verifyEmail"]
  const {user, updateUserProfile} = useContext(AuthContext);

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

  const handleAddService = e => {
    // Disabling form default behavior
    e.preventDefault();
    // Create object using form data to req server
    const service = {
      title: e.target.title.value,
      slug: e.target.title.value.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''),
      thumbnail: thumbnail,
      description: e.target.description.value,
      price: e.target.price.value,
      userName: user?.displayName,
      userId: user?.uid,
      userPhoto: user?.photoURL || userPhoto,
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
      if(data.success){
        // Update user details
        updateUserProfile({photoURL: data.updatedPhoto})
        // Successful toast
        toast.success(data.message, {
          autoClose: 1500, position: toast.POSITION.TOP_CENTER
        });
      } else {
        toast.error(data.error, {
          autoClose: 1500, position: toast.POSITION.TOP_CENTER
        });
      }
    })
    .catch(err => {
      toast.error(err.message);
    })
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